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
           comment: "",
           post: {
               title: "",
               author: "",
               body: "",
               link: "",
           }
        };
    }

    componentDidMount() {
        this.commentRef = firebase.database().ref('comments/');
        this.postRef = firebase.database().ref('posts/' + this.props.match.params.id);
        this.postRef.on('value', (snapshot) => {
            let post = snapshot.val();
            if (post != null) {
                this.setState({ post: post });
            } else {
                this.setState({
                    post: {
                        title: "",
                        author: "",
                        body: "",
                        link: "",
                    }
                });
            }
        });
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
            alert("Please enter a comment!");
        } else if (firebase.auth().currentUser == null) {
            alert("Please log in to comment!");
        } else {
            let comment = {
                creator: firebase.auth().currentUser.displayName,
                body: this.state.comment,
                postID: this.props.match.params.id,
                date: new Date().getTime()
            }
            this.commentRef.push(comment);
        }
    }

    render() {
        let $linker = null;
        console.log(this.state.post.link);
        console.log(this.state.post.body);
        if (this.state.post.link !== '') {
            $linker = (<a href = {this.state.post.link}
                title="The link given">{this.state.post.link}</a>);
        }
        let $body = (this.state.post.body.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;})
        );
        return (
            <Grid fluid className="forum-container">
                <Row>
                    <Col mdOffset={1} xs={12} md={10}>
                <h1>{this.state.post.title}</h1>
                <p>by {this.state.post.author}</p>
                <div className="contain-post-body">
                    {$body}
                    {$linker}
                    {this.state.post.imgUrl !== "" && <img src={this.state.post.imgUrl} alt="asdf" style={{ width: '100%' }}/>} 
                </div>
                <div align="left">
                <textarea className="write-comment full-width" rows="8" cols="60" name="comment" onChange={event => this.handleChange(event)} align="left"></textarea>
                <div></div>
                <Button className="button-style" color="primary" variant="contained" onClick={() => this.handleComment()}>
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
