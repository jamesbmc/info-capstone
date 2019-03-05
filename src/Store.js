import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Patient } from './Patient';

export class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            show: false,
            name: "",
            addr: "",
            dob: ""
        };
    }

    componentDidMount() {
        this.queueRef = firebase.database().ref('queue/' + this.props.queueId);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    addPatient() {
        if (this.state.name === "" || this.state.addr === "" || this.state.dob === "") {
            alert("One of the required fields is empty!");
            return;
        } else {
            let patients = this.state.patients;
            let newPatient = {
                name: this.state.name,
                addr: this.state.addr,
                dob: this.state.dob
            }
            patients.push(newPatient);
            this.setState({patients: patients});
            this.handleClose();
        }
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    render() {
        let patients = this.state.patients.map((patient, i) => {return <Patient info={patient} key = {i} />});
        return (
            <div>
                <div style={{ 'backgroundColor': 'grey', 'paddingTop': '15px', 'paddingBottom': '1px' }}>
                    <div className="form-group">
                        <div className="col-12">

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Name:</label>
                                <input type="text" name="name" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Address:</label>
                                <input type="text" name="addr" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient DOB:</label>
                                <input type="text" name="dob" className="form-control"/>
                            </div>

                        </div>
                        <div style={{ 'paddingTop': '7px' }}></div>
                        <button className="btn btn-primary" onClick={() => this.handleShow()}>Add a Patient</button>
                    </div>
                </div>
                <div className="jumbotron">
                    <div className="row">
                        {patients}
                    </div>

                </div>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Patient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Patient Name:</label>
                            <span>         </span>
                            <input type="text" name="name" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient Address:</label>
                            <span>         </span>
                            <input type="text" name="addr" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient DOB:</label>
                            <span>         </span>
                            <input type="text" name="dob" onChange={event => this.handleChange(event)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.addPatient()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}