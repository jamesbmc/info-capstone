import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Post } from './Post';

export class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: []
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
                        title: posts[id].title,
                        body: posts[id].body,
                        author: posts[id].author,
                        date: new Date(posts[id].date),
                        upvotes: posts[id].upvotes,
                        downvotes: posts[id].downvotes,
                        comments: posts[id].comments
                    }
                });
                this.setState({ posts: postArray});
            } else {
                this.setState({ posts: []});
            }
        });

        this.userRef = firebase.database().ref('users');

        this.userRef.on('value', (snapshot) => {
          if (snapshot.val() !== null) {
            this.setState({users: snapshot.val()});
        } else {
            this.setState({users: []});
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
        } else {
            let newPost = {
                title: this.state.title,
                body: this.state.body,
                author: Object.keys(this.state.users[firebase.auth().currentUser.uid])[0],
                date: new Date().getTime(),
                upvotes: [firebase.auth().currentUser.uid]
            }
            this.infoRef.push(newPost);
            this.handleClose();
        }
    }

    render() {
        let posts = this.state.posts.sort((a, b) => {
            let aUpvotes = typeof a.upvotes === "undefined" ? 0 : a.upvotes.length;
            let aDownvotes = typeof a.downvotes === "undefined" ? 0 : a.downvotes.length;
            let bUpvotes = typeof b.upvotes === "undefined" ? 0 : b.upvotes.length;
            let bDownvotes = typeof b.downvotes === "undefined" ? 0 : b.downvotes.length;
            return (bUpvotes - bDownvotes) - (aUpvotes - aDownvotes);
        }).map((post, i) => <Post key={i} info={post} username={Object.keys(this.state.users[firebase.auth().currentUser.uid])[0]} />);
        return (
            <div>
            <button className="btn btn-primary" onClick={() => this.props.logout()}>Logout</button>
            <div style={{height: '80%', border: '1px black solid', position: 'absolute', width: '100%'}}>
                {posts}
            </div>
            <button className="btn btn-primary" onClick={() => this.handleShow()} style={{position: 'absolute', top: '90%'}}>Create a New Post</button>
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Title:</p>
                            <span>         </span>
                            <input type="text" name="title" onChange={event => this.handleChange(event)} style={{width: '95%'}} />
                        </div>
                        <div>
                            <p>Body:</p>
                            <span>         </span>
                            <textarea rows="8" cols="60" name="body" onChange={event => this.handleChange(event)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.post()}>
                            Post
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}