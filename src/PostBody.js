import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import 'firebase/database';
import { Comments } from './Comments';

export class PostBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
           comment: ""
        };
    }

    componentDidMount() {
        this.commentRef = firebase.database().ref('comments/');
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
            let comment = {
                creator: this.props.location.state.username,
                body: this.state.comment,
                postID: this.props.match.params.id,
                date: new Date().getTime()
            }
            this.commentRef.push(comment);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.location.state.title}</h1>
                <p>{this.props.location.state.username}</p>
                <div className="jumbotron">
                    <p>{this.props.location.state.body}</p>
                </div>
                <div align="left">
                <textarea rows="8" cols="60" name="comment" onChange={event => this.handleChange(event)} align="left"></textarea>
                <div></div>
                <Button variant="primary" onClick={() => this.handleComment()}>
                    Comment
                </Button>
                </div>
                <hr />
                <div align="left" style={{'marginLeft': '1rem'}}>
                    <Comments postID={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}
