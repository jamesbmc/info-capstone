import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-bootstrap/Modal';
import firebase from 'firebase/app';
import 'firebase/database';

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            firstName: '',
            lastName: '',
            email: '',
            zip: '',
            emailExists: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    // for member sign in
    componentDidMount() {
        this.memberRef = firebase.database().ref('members/');
        console.log(this.memberRef);
    }

    // for member sign in
    handleMemberSignUp() {
        console.log(this.state.email);
        firebase.database().ref("members/set/" + this.state.email.split('.').join("")).once('value')
        .then((snapshot) => {
            var a = snapshot.exists();  // true if email exists already, false if doesn't exist.
            this.setState({emailExists: a});
        })
        .then(() => {
            console.log(this.state.emailExists);
            if (this.state.fullName === "" || this.state.email === "") {
                alert("One of the required fields is empty!");
                return;
            } else if (this.state.emailExists) {
                alert("This email is already on our list!");
            } else {
                let member = {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    zip: this.state.zip
                };
                this.memberRef.push(member);
                this.memberRef.child("set").child(this.state.email.split('.').join("")).push(1);
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

    render() {

        return (
            <AppBar position="fixed" className="app-bar">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className="app-bar-title">
                        <Link to="/">Gravity</Link>
                    </Typography>
                    <Button className="button-style button-spacer nav-buttons" component={Link} to="/contact">About</Button>
                    <Button className="button-style button-spacer nav-buttons" component={Link} to="/forum">Forum</Button>
                    <Button className="button-style button-spacer nav-buttons" component={Link} to="/resources">Resources</Button> 
                    <Button className="button-style" color="primary" variant="outlined" onClick={() => this.handleShow()}>
                        Become a Member
                    </Button>
                </Toolbar>
                <Modal className="post-modal" show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Join Project Gravity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>First Name:</p>
                            <span>         </span>
                            <input className="full-width" type="text" name="firstName" onChange={event => this.handleChange(event)} />
                        </div>
                        <div>
                            <p>Last Name:</p>
                            <span>         </span>
                            <input className="full-width" type="text" name="lastName" onChange={event => this.handleChange(event)} />
                        </div>
                        <div>
                            <p>Email:</p>
                            <span>         </span>
                            <input className="full-width" type="text" name="email" onChange={event => this.handleChange(event)} />
                        </div>
                        <div>
                            <p>ZIP/Postal Code:</p>
                            <span>         </span>
                            <input className="full-width" type="text" name="zip" onChange={event => this.handleChange(event)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button-style" color="primary" variant="contained" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button className="button-style" color="primary" variant="outlined" onClick={() => this.handleMemberSignUp()}>
                            Add Your Name
                        </Button>
                    </Modal.Footer>
                </Modal>
            </AppBar>
        );
    }
}
