import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    // Method for handling someone signing up
    handleSignUp() {

        // Create a new user and save their information
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            // Update the display name of the user
            let profilePromise = firebase.auth().currentUser.updateProfile({
                displayName: this.state.username
            });

            // Return promise for chaining
            return profilePromise;
        })
        .then(() => {
            // Set the state as the current (firebase) user
            this.setState({
                user: firebase.auth().currentUser,
                username: ''
            });
        })
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    }

    // Method for handling someone signing in
    handleSignIn() {
        // Sign in the user
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    }


    render() {
        let errorDiv = this.state.errorMessage === "" ? "" : <div className="alert alert-danger">Error: {this.state.errorMessage}</div>
        return (
            <div className="jumbotron">
                <div className="container">
                    {errorDiv}
                    <div className="Auth">
                        <p>Please sign in or sign up to access patient documents:</p>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <div>
                            <button className="btn btn-dark mr-2 mt-2" onClick={() => this.handleSignIn()}>Sign In</button>
                            <button className="btn btn-outline-secondary mr-2 mt-2" onClick={() => this.handleSignUp()}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
