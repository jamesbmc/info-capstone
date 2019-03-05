import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Auth } from './Auth';
import { Store } from './Store';

export class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        // Listen to state authentication state change
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });
            } else {
                this.setState({ user: null });
            }
        });
    }

    logout() {
        this.setState({ user: null });
    }

    render() {
        return (
            <div>
                {!this.state.user && <Auth />}
                {this.state.user && <Store />}
            </div>
        );
    }
}
