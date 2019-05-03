import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/database';
import { Comments } from './Comments';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
            <Grid fluid className="forum-container">
                <Row>
                    <Col mdOffset={1} xs={12} md={10}>
                <h1>{this.props.location.state.title}</h1>
                <p>by {this.props.location.state.author}</p>
                <div className="contain-post-body">
                    {this.props.location.state.body}
                </div>
                <div align="left">
                <textarea className="write-comment full-width" rows="8" cols="60" name="comment" onChange={event => this.handleChange(event)} align="left"></textarea>
                <div></div>
                <Button color="primary" variant="contained" onClick={() => this.handleComment()}>
                    Comment
                </Button>
                </div>
                <div align="left" style={{'marginLeft': '1rem'}}>
                    <Comments postID={this.props.match.params.id} />
                </div>
            </Col>
            </Row>
            </Grid>
        )
    }
}
