import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import upvote from './upvote.png';
import upvoteDisabled from './upvoteDisabled.png';
import downvote from './downvote.png';
import downvoteDisabled from './downvoteDisabled.png';
import firebase from 'firebase/app';
import 'firebase/database';

export class Post extends Component {
    handleVote(e, action) {
        e.preventDefault();
        if (action === "up") {
            if (typeof this.props.info.downvotes !== "undefined" && this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) {
                let newDownvotes = this.props.info.downvotes.filter(id => id !== firebase.auth().currentUser.uid);
                firebase.database().ref('posts/' + this.props.info.id).update({downvotes: newDownvotes});
            }
            firebase.database().ref('posts/' + this.props.info.id).update({upvotes: typeof this.props.info.upvotes === "undefined" ? [firebase.auth().currentUser.uid] : this.props.info.upvotes.concat(firebase.auth().currentUser.uid)});
        } else {
            if (typeof this.props.info.upvotes !== "undefined" && this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) {
                let newUpvotes = this.props.info.upvotes.filter(id => id !== firebase.auth().currentUser.uid);
                firebase.database().ref('posts/' + this.props.info.id).update({upvotes: newUpvotes});
            }
            firebase.database().ref('posts/' + this.props.info.id).update({downvotes: typeof this.props.info.downvotes === "undefined" ? [firebase.auth().currentUser.uid] : this.props.info.downvotes.concat(firebase.auth().currentUser.uid)});
        }
    }

    voidVote(e, action) {
        e.preventDefault();
        if (action === "up") {
            let newUpvotes = this.props.info.upvotes.filter(id => id !== firebase.auth().currentUser.uid);
            firebase.database().ref('posts/' + this.props.info.id).update({upvotes: newUpvotes});
        } else {
            let newDownvotes = this.props.info.downvotes.filter(id => id !== firebase.auth().currentUser.uid);
            firebase.database().ref('posts/' + this.props.info.id).update({downvotes: newDownvotes});
        }
    }

    render() {
        let upvotes = typeof this.props.info.upvotes === "undefined" ? 0 : this.props.info.upvotes.length;
        let downvotes = typeof this.props.info.downvotes === "undefined" ? 0 : this.props.info.downvotes.length;
        let total = upvotes - downvotes;
        return (
            <div>
                <Link to={{
                    pathname: "/demo/" + this.props.info.id,
                    state: {
                        username: this.props.username,
                        title: this.props.info.title,
                        author: this.props.info.author,
                        body: this.props.info.body
                    }
                 }} style={{ textDecoration: 'none' }}>
                    <div align='left' style={{backgroundColor: '#eee', padding: '1rem'}}>
                        {(typeof this.props.info.upvotes === "undefined" || !this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) && <img src={upvote} style={{ width: '3%' }} alt="Upvote icon" onClick={(e) => this.handleVote(e, "up")}/>}
                        {(typeof this.props.info.upvotes !== "undefined" && this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) && <img src={upvoteDisabled} style={{ width: '3%' }} alt="Upvote icon (disabled)" onClick={(e) => this.voidVote(e, "up")} />}
                        <p style={{display: 'inline', color: total >= 0 ? 'green' : 'red'}}>{total}</p>
                        {(typeof this.props.info.downvotes === "undefined" || !this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) && <img src={downvote} style={{ width: '3%' }} alt="Downvote icon" onClick={(e) => this.handleVote(e, "down")} />}
                        {(typeof this.props.info.downvotes !== "undefined" && this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) && <img src={downvoteDisabled} style={{ width: '3%' }} alt="Downvote icon (disabled)" onClick={(e) => this.voidVote(e, "down")} />}
                        <h3 style={{display: 'inline', 'marginLeft': '3rem', color:'black'}}>{this.props.info.title}</h3>
                        <p style={{display: 'inline', 'float': 'right', color:'black'}}>{this.props.info.author + ", " + this.props.info.date}</p>
                        {this.props.username === this.props.info.author && <p>this will be a delete button</p>}
                    </div>
                    <div style={{paddingBottom: '.5rem'}}>
                    </div>
                </Link>
            </div>
        )
    }
}
