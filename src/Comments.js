import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Comment } from './Comment';

export class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
           comments: []
        };
    }

    componentDidMount() {
        this.commentRef = firebase.database().ref('comments/').orderByChild("postID").equalTo(this.props.postID);

        this.commentRef.on('value', (snapshot) => {
            let comments = snapshot.val();
            if (comments !== null) {
                let commentArray = Object.keys(comments).map(id => {
                    return {
                        id: id,
                        body: comments[id].body,
                        creator: comments[id].creator,
                        date: new Date(comments[id].date),
                        postID: comments[id].postID
                    }
                });
                this.setState({ comments: commentArray});
            } else {
                this.setState({ comments: []});
            }
        });
    }

    render() {
        let comments = this.state.comments.sort((a, b) => b.date - a.date).map((comment, i) => <Comment key={i} info={comment} />);
        return (
            <div>
                {comments}
            </div>
        )
    }
}
