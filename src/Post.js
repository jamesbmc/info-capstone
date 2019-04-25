import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import 'firebase/database';
import { Comment } from './Comment';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
           comment: ""
        };
    }

    componentDidMount() {
        this.infoRef = firebase.database().ref('posts/' + this.props.info.id);
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

    handleComment() {
        if (this.state.comment === "") {
            alert("Please enter a comment!")
        } else {
            let comment = this.props.username + ": " +  this.state.comment;
            let comments = typeof this.props.info.comments === "undefined" ? [comment] : this.props.info.comments.push(comment);
            this.infoRef.update({comments: comments});
        }
    }

    render() {
        let upvotes = typeof this.props.info.upvotes === "undefined" ? 0 : this.props.info.upvotes.length;
        let downvotes = typeof this.props.info.downvotes === "undefined" ? 0 : this.props.info.downvotes.length;
        let total = upvotes - downvotes;
        let comments = typeof this.props.info.comments === "undefined" ? [] : this.props.info.comments.map((comment, i) => <Comment key={i} info={comment} />);
        return (
          <div>
              <div onClick={() => this.handleShow()}>
                <div align='left' style={{backgroundColor: '#eee', padding: '1rem'}}>
                  <p style={{display: 'inline', color: total >= 0 ? 'green' : 'red'}}>{total}</p>
                  <h3 style={{display: 'inline', 'marginLeft': '3rem'}}>{this.props.info.title}</h3>
                  <p style={{display: 'inline', 'float': 'right'}}>{this.props.info.author + ", " + this.props.info.date}</p>
              </div>
              <div style={{paddingBottom: '.5rem'}}></div>
              </div>
              <Modal show={this.state.show} onHide={() => this.handleClose()} size="lg">
                      <Modal.Header closeButton>
                          <Modal.Title>{this.props.info.title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="jumbotron">
                              {this.props.info.body}
                          </div>
                          <textarea rows="8" cols="60" name="comment" onChange={event => this.handleChange(event)} align="left"></textarea>
                          <div></div>
                          <Button variant="primary" onClick={() => this.handleComment()}>
                              Comment
                          </Button>
                          <hr />
                          {comments}

                      </Modal.Body>
                  </Modal>
              </div>
        )
    }
}
