import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Button from '@material-ui/core/Button';

export class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: null
        };
    }

    componentWillMount() {
        firebase.database().ref("Admin/" + this.props.username).once('value')
            .then((snapshot) => {
                var a = snapshot.exists();  // true if an admin, false if not an admin
                this.setState({isAdmin: a});
        });
    }

    deleteComment(messageRef) {
        messageRef.remove();
    }

    render() {
        return (
            <div>
                <p>{this.props.info.creator + ": " + this.props.info.body}</p>
                {(firebase.auth().currentUser.displayName === this.props.info.creator || this.state.isAdmin) && <Button className="button-style" color="primary" variant="outlined" onClick={() => this.deleteComment(firebase.database().ref('comments/' + this.props.info.id))}> Delete Comment </Button>}
            </div>
        )
    }
}
