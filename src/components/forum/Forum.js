import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { Post } from './Post';
import './forum.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const divStyle = {
    width: "239px",
    height: "39px"
};

export class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            file: "",
            imagePreviewUrl: "", //added
            url: '',
            imagePath: '',
            link: "",
        };
    }

    componentDidMount() {
        this.infoRef = firebase.database().ref('posts');

        this.infoRef.on('value', (snapshot) => {
            let posts = snapshot.val();
            if (posts != null) {
                let postArray = Object.keys(posts).map(id => {
                    return {
                        id: id,
                        imgUrl: posts[id].imgUrl,
                        imgFullPath: posts[id].imgFullPath,
                        title: posts[id].title,
                        body: posts[id].body,
                        author: posts[id].author,
                        date: new Date(posts[id].date),
                        upvotes: posts[id].upvotes,
                        downvotes: posts[id].downvotes,
                        comments: posts[id].comments,
                        link: posts[id].link,
                    }
                });
                this.setState({ posts: postArray });
            } else {
                this.setState({ posts: [] });
            }
        });

        this.userRef = firebase.database().ref('users');

        this.userRef.on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                this.setState({ users: snapshot.val(), username: Object.keys(snapshot.val()[firebase.auth().currentUser.uid])[0] });
            } else {
                this.setState({ users: [], username: "" });
            }
        });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    post() {
        if (this.state.title === "" || this.state.body === "") {
            alert("One of the required fields is empty!");
            return;
        }
        if (this.state.file !== '') {
            var storageRef = firebase.storage().ref();
            var file = this.state.file;
            var metadata = { contentType: 'image/png', };
            var user = firebase.auth().currentUser;
            var email = user.email;
            var uploadTask = storageRef.child(email).child('images/' + file.name).put(file, metadata);
            this.setState({ imagePath: email + "/" + 'images/' + file.name });
            console.log(this.state.imagePath);
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                    default:
                        break;
                }
            }, function (error) {
                // Handle unsuccessful uploads
                console.log(error)

                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                    case 'storage/object_not_found':
                        break;
                    case 'storage/bucket_not_found':
                        break;
                    case 'storage/quota_exceeded':
                        break;
                    case 'storage/unauthenticated':
                        break;
                    case 'storage/invalid_checksum':
                        break;
                    case 'storage/retry_limit_exceeded':
                        break;
                    case 'storage/invalid_event_name':
                        break;
                    case 'storage/invalid_url':
                        break;
                    case 'storage/invalid-argument':
                        break;
                    case 'storage/no_default_bucket':
                        break;
                    case 'storage/cannot_slice_blob':
                        break;
                    case 'storage/server_wrong_file_size	':
                        break;
                    default:
                        console.log('no errors');

                }
            }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                // test imgName for then deleting later.
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    let newPost = {
                        title: this.state.title,
                        imgUrl: downloadURL,
                        imgFullPath: this.state.imagePath,
                        link: this.state.link,
                        body: this.state.body,
                        author: this.state.username,
                        date: new Date().getTime(),
                        upvotes: [firebase.auth().currentUser.uid]
                    }
                    this.infoRef.push(newPost);
                    this.handleClose();
                });
            });
        } else {
            let newPost = {
                title: this.state.title,
                imgUrl: "",
                link: this.state.link,
                body: this.state.body,
                author: this.state.username,
                date: new Date().getTime(),
                upvotes: [firebase.auth().currentUser.uid]
            }
            this.infoRef.push(newPost);
            this.handleClose();
        }
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<div className="contain-img-preview"><img className="img-preview" alt="preview of what is being displayed" src={imagePreviewUrl} /></div>)
        }
        let posts = this.state.posts.sort((a, b) => {
            let aUpvotes = typeof a.upvotes === "undefined" ? 0 : a.upvotes.length;
            let aDownvotes = typeof a.downvotes === "undefined" ? 0 : a.downvotes.length;
            let bUpvotes = typeof b.upvotes === "undefined" ? 0 : b.upvotes.length;
            let bDownvotes = typeof b.downvotes === "undefined" ? 0 : b.downvotes.length;
            return (bUpvotes - bDownvotes) - (aUpvotes - aDownvotes);
        }).map((post, i) => <Post key={i} info={post} username={this.state.username} />);
        return (
            <div>
            <div className ="forum-buttons">
                <div className="col">
                <Button color="primary" variant="contained" className="button-style button-spacer" onClick={() => this.handleShow()}>Create a New Post</Button>
                </div><div className="col">
                <div className="float-right forum-buttons-padding">Signed in as {this.state.username}. <a className="sign-out" onClick={() => this.props.logout()}>Log Out</a>.
                </div></div></div>
                <div className="contain-posts">
                    {posts}
                </div>


                <Modal className="post-modal" show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Title:</p>

                            <input className="full-width new-post-form" type="text" name="title" onChange={event => this.handleChange(event)} />
                        </div>

                        <div className="imgPreview">  {$imagePreview}
                        </div>
                        <div className="flex-start-file">
                            <p>File to upload: </p>
                            <input type="file" style={divStyle}
                                accept="image/*"
                                className="form-control-upload new-post-form"
                                onChange={evt => this.handleImageChange(evt)}
                            />

                        </div>
                        <div>
                            <p>Body:</p>

                            <textarea className="full-width new-post-form" rows="8" cols="60" name="body" onChange={event => this.handleChange(event)} />
                        </div>
                        <div>
                            <p>Share a link (optional):</p>

                            <input className="full-width" type="text" name="link" onChange={event => this.handleChange(event)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button-style" color="primary" variant="contained" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button className="button-style" color="primary" variant="outlined" onClick={() => this.post()}>
                            Post
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
