import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@material-ui/core/Button';

export class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errorMessage: '',
            users: {
              set: []
            }
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.infoRef = firebase.database().ref('users/');

        this.infoRef.on('value', (snapshot) => {
            if (this._isMounted) {
                if (snapshot.val() !== null) {
                  this.setState({users: snapshot.val()});
              } else {
                  this.setState({
                      users: {
                          set: []
                      }
                  });
              }
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

    // Method for handling someone signing up
    handleSignUp() {

      if (this.state.users.set.length !== 0 && typeof this.state.users.set[this.state.username] !== "undefined") {
        alert("Username already in use!");
      } else {
        this.infoRef.child("set").child(this.state.username).push(1);

        // Create a new user and save their information
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            // Update the display name of the user
            let profilePromise = firebase.auth().currentUser.updateProfile({
                displayName: this.state.username
            });

            this.infoRef.child(firebase.auth().currentUser.uid).child(this.state.username).push(1);

            // Return promise for chaining
            return profilePromise;
        })
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
      }
    }

    // Method for handling someone signing in
    handleSignIn() {
        // Sign in the user
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    }

    handleReset() {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let errorDiv = this.state.errorMessage === "" ? "" : <div className="alert alert-danger">Error: {this.state.errorMessage}</div>;
        return (
            <div className="jumbotron">
                <div className="container">
                    {errorDiv}
                    <div className="Auth">
                        <p>Sign in or sign up to access forum:</p>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label>User Name:</label>
                        <input className="form-control" name="username" value={this.state.username} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <div>
                            <Button className="button-spacer" color="primary" variant="outlined" onClick={() => this.handleSignIn()}>Sign In</Button>
                            <Button className="button-spacer" color="primary" variant="contained" onClick={() => this.handleSignUp()}>Sign Up</Button>
                            <Button size="small" color="primary" variant="outlined" onClick={() => this.handleReset()}>Reset Password</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
