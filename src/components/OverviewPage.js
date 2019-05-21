import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@material-ui/core/Button';

export class OverviewPage extends Component {
    // for member sign in
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            zip: '',
            errorMessage: '',
            emailExists: false
        };
    }

    // for member sign in
    componentDidMount() {
        this.memberRef = firebase.database().ref('members/');
    }

    // for member sign in
    handleMemberSignUp() {
        // must take away period since firebase doesn't allow them.
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
                // use this to check if that email already exists.
                this.memberRef.child("set").child(this.state.email.split('.').join("")).push(1);
            }
        });
    }

    // for member sign in
    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }


    render() {
        // bottom 2 lines for member sign in
        let errorDiv = this.state.errorMessage === "" ? "" : <div className="alert alert-danger">Error: {this.state.errorMessage}</div>;
        // {errorDiv} place this somewhere nice.
        return (
            <Grid fluid>
                <Row center="xs" className="splash">
                    <Col lg={8} xs={10}>
                        <div className="main-title">Project Gravity</div>
                        <div className="sub-title">Unified people for a unified EHR system.</div>
                    </Col>
                </Row>
                <Row className="content-row">
                    <Col xsOffset={1} xs={10} md={6}>

                        <h1 className="landing-header">Together, we can build a better EHR system. Join the movement.</h1>
                        <p>Bringing patients, clinicians, and health care leaders together to create a market demand for robust interoperability between electronic health record (EHR) systems. Add your name for the latest updates.</p>
                        <Button color="primary" variant="contained" component={Link} to="/contact">
                            Learn More
                        </Button>
                    </Col>
                    <Col xs={10} md={4}>
                        <div className="contain-sign-up">
                        {/*need to add email signup form component*/}
                        <form>
                            <input className="form-item" type="text" name="firstName" placeholder="FIRST NAME" value={this.state.firstName} onChange={event => this.handleChange(event)} />
                            <input className="form-item" type="text" name="lastName" placeholder="LAST NAME" value={this.state.lastName} onChange={event => this.handleChange(event)}/>
                            <input className="form-item" type="email" name="email" placeholder="EMAIL" value={this.state.email} onChange={event => this.handleChange(event)}/>
                            <input className="form-item" type="text" name="zip" placeholder="ZIP / POSTAL CODE" value={this.state.zip} onChange={event => this.handleChange(event)}/>
                            <Button className="button-spacer" color="Grey" variant="outlined" onClick={() => this.handleMemberSignUp()}>ADD YOUR NAME</Button>
                        </form>
                        </div>
                    </Col>
                </Row>

                <Row className="content-row bg-green">
                <Col xsOffset={1} xs={10}>
                    <p>
                        The problem of information sharing across different hospitals and healthcare systems is a huge issue in the medical field.
                        Hospitals use many types of electronic health records (EHR) solutions that do not communicate well with each other, so transmission of patient records
                        becomes tedious and challenging. Interoperability is a problem that many hospitals face, which is the problem of EHRs from one hospital system
                        being unable to interact with an EHR from another system. To solve this problem, legislation needs to be created to either mandate a single EHR for all United
                        States hospitals to use or enforce interoperability standards. We have built a platform to facilitate discussion around the standardization of healthcare record
                        formats and transmission of those documents. Our goal is creating an accessible repository with information as to why this consolidation is a worthy cause, and
                        a place to start a discussion on how to achieve mandatory consolidation or interoperability standards through reaching out to state and national legislators.
                </p>
                </Col>
                </Row>

                <Row className="content-row">
                <Col xsOffset={1} xs={10}>
                    <p>
                        news items here
                </p>
                </Col>
                </Row>

                <Row between="xs" className="content-row bg-blue">
                    <Col xsOffset={1} xs={12} md={3}>
                    {/*need to add email signup form component*/}
                    footer column 1
                    </Col>
                    <Col xs={12} md={3}>
                    footer column 2
                    </Col>
                    <Col xs={12} md={3}>
                    footer column 3
                    </Col>
                </Row>
            </Grid>
        );
    }
}
