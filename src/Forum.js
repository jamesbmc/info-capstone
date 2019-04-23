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
        this.userRef = firebase.database().ref('users');

        this.infoRef.on('value', (snapshot) => {
            let posts = snapshot.val();
            if (posts != null) {
                let postArray = Object.keys(posts).map(id => {
                    return {
                        id: id,
                        title: posts[id].title,
                        body: posts[id].body,
                        author: posts[id].author,
                        date: posts[id].date,
                        upvotes: posts[id].upvotes,
                        downvotes: posts[id].downvotes,
                    }
                });
                this.setState({ posts: postArray});
            } else {
                this.setState({ posts: []});
            }
        });

        this.userRef.on('value', (snapshot) => {
          if (snapshot.val() !== null) {
            this.setState({users: snapshot.val()});
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
            let userName = this.state.users[firebase.auth().currentUser.uid]
            let datetime = new Date().toString()
            let newPost = {
                title: this.state.title,
                body: this.state.body,
                author: Object.keys(userName)[0],
                date: datetime,
                upvotes: [firebase.auth().currentUser.uid]
            }
            this.infoRef.push(newPost);
            this.handleClose();
        }
    }

    render() {
        let posts = this.state.posts.map((post, i) => <Post key={i} info={post} />);
        return (
            <div>
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
                            <label>Title:</label>
                            <span>         </span>
                            <input type="text" name="title" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Body:</label>
                            <span>         </span>
                            <input type="text" name="body" onChange={event => this.handleChange(event)}/>
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
