import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import upvote from '../../assets/upvote.png';
import upvoteDisabled from '../../assets/upvoteDisabled.png';
import downvote from '../../assets/downvote.png';
import downvoteDisabled from '../../assets/downvoteDisabled.png';
import firebase from 'firebase/app';
import 'firebase/database';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: null,
            imagePreview: ''
        };
    }
    
    componentWillMount() {
        firebase.database().ref("Admin/" + this.props.username).once('value')
            .then((snapshot) => {
                var a = snapshot.exists();  // true if an admin, false if not an admin
                console.log(a);
                this.setState({isAdmin: a});
        });
        this.setState({imagePreview: this.props.info.imgUrl});
    }

    handleVote(e, action) {
        e.preventDefault();
        if (action === "up") {
            if (typeof this.props.info.downvotes !== "undefined" && this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) {
                let newDownvotes = this.props.info.downvotes.filter(id => id !== firebase.auth().currentUser.uid);
                firebase.database().ref('posts/' + this.props.info.id).update({ downvotes: newDownvotes });
            }
            firebase.database().ref('posts/' + this.props.info.id).update({ upvotes: typeof this.props.info.upvotes === "undefined" ? [firebase.auth().currentUser.uid] : this.props.info.upvotes.concat(firebase.auth().currentUser.uid) });
        } else {
            if (typeof this.props.info.upvotes !== "undefined" && this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) {
                let newUpvotes = this.props.info.upvotes.filter(id => id !== firebase.auth().currentUser.uid);
                firebase.database().ref('posts/' + this.props.info.id).update({ upvotes: newUpvotes });
            }
            firebase.database().ref('posts/' + this.props.info.id).update({ downvotes: typeof this.props.info.downvotes === "undefined" ? [firebase.auth().currentUser.uid] : this.props.info.downvotes.concat(firebase.auth().currentUser.uid) });
        }
    }

    voidVote(e, action) {
        e.preventDefault();
        if (action === "up") {
            let newUpvotes = this.props.info.upvotes.filter(id => id !== firebase.auth().currentUser.uid);
            firebase.database().ref('posts/' + this.props.info.id).update({ upvotes: newUpvotes });
        } else {
            let newDownvotes = this.props.info.downvotes.filter(id => id !== firebase.auth().currentUser.uid);
            firebase.database().ref('posts/' + this.props.info.id).update({ downvotes: newDownvotes });
        }
    }

    // make the functionality for this.
    deletePost(messageRef) {
        messageRef.remove();
    }
    
    render() {
        let upvotes = typeof this.props.info.upvotes === "undefined" ? 0 : this.props.info.upvotes.length;
        let downvotes = typeof this.props.info.downvotes === "undefined" ? 0 : this.props.info.downvotes.length;
        let total = upvotes - downvotes;
        let $image = null;
        if (this.state.imagePreview) {
            $image = this.state.imagePreview;
        } else {
            $image = '';
        }
        return (
            <div>
                <Card className="post-card">
                    <CardActionArea>
                    <Link to={{
                    pathname: "/demo/" + this.props.info.id,
                    state: {
                        username: this.props.username,
                        title: this.props.info.title,
                        author: this.props.info.author,
                        body: this.props.info.body
                    }
                }}>
                        {<CardMedia
                            component="img"
                            alt=""
                            className="post-media"
                            image= {$image}
                            title=""
                        />}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {this.props.info.title}
          </Typography>
                            <Typography component="p">
                            {this.props.info.author + ", " + this.props.info.date}
          </Typography>
                        </CardContent>
                        </Link>
                    </CardActionArea>
                    <CardActions>
                    {(typeof this.props.info.upvotes === "undefined" || !this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) && <img src={upvote} className="vote-button" alt="Upvote icon" onClick={(e) => this.handleVote(e, "up")} />}
                        {(typeof this.props.info.upvotes !== "undefined" && this.props.info.upvotes.includes(firebase.auth().currentUser.uid)) && <img src={upvoteDisabled} className="vote-button" alt="Upvote icon (disabled)" onClick={(e) => this.voidVote(e, "up")} />}
                        <p>{total}</p>
                        {(typeof this.props.info.downvotes === "undefined" || !this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) && <img src={downvote} className="vote-button" alt="Downvote icon" onClick={(e) => this.handleVote(e, "down")} />}
                        {(typeof this.props.info.downvotes !== "undefined" && this.props.info.downvotes.includes(firebase.auth().currentUser.uid)) && <img src={downvoteDisabled} className="vote-button" alt="Downvote icon (disabled)" onClick={(e) => this.voidVote(e, "down")} />}
                        {(this.props.username === this.props.info.author || this.state.isAdmin) && <Button color="primary" variant="outlined" onClick={() => this.deletePost(firebase.database().ref('posts/' + this.props.info.id))}> Delete Post </Button>}
                    </CardActions>
                </Card>

                


                
                    <div>
                    </div>
                
            </div>
        )
    }
}
