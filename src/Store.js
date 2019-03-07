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
            newName: "",
            newAddr: "",
            newDob: "",
            searchName: "",
            searchAddr: "",
            searchDob: ""
        };
    }

    componentDidMount() {
        this.infoRef = firebase.database().ref('patients/');

        this.infoRef.on('value', (snapshot) => {
            let patients = snapshot.val();
            if (patients != null) {
                let patientArray = Object.keys(patients).map(id => {
                    return {
                        id: id,
                        name: patients[id].name,
                        addr: patients[id].addr,
                        dob: patients[id].dob,
                        records: patients[id].records
                    }
                });
                this.setState({ patients: patientArray});
            } else {
                this.setState({ patients: []});
            }
        });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    addPatient() {
        if (this.state.newName === "" || this.state.newAddr === "" || this.state.newDob === "") {
            alert("One of the required fields is empty!");
            return;
        } else {
            let newPatient = {
                name: this.state.newName,
                addr: this.state.newAddr,
                dob: this.state.newDob,
                records: []
            }
            this.infoRef.push(newPatient);
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
        let filtered = this.state.patients;
        if (this.state.searchName !== "") {
            filtered = filtered.filter(patient => patient.name.toLowerCase().includes(this.state.searchName.toLowerCase()));
        }
        if (this.state.searchAddr !== "") {
            filtered = filtered.filter(patient => patient.addr.toLowerCase().includes(this.state.searchAddr.toLowerCase()));
        }
        if (this.state.searchDob !== "") {
            filtered = filtered.filter(patient => patient.dob.toLowerCase().includes(this.state.searchDob.toLowerCase()));
        }
        let patients = filtered.map((patient, i) => {return <Patient info={patient} key = {i} />});
        return (
            <div>
                <div style={{ 'backgroundColor': 'grey', 'paddingTop': '15px', 'paddingBottom': '1px' }}>
                    <div className="form-group">
                        <div className="col-12">

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Name:</label>
                                <input type="text" name="searchName" className="form-control" onChange={event => this.handleChange(event)} />
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Address:</label>
                                <input type="text" name="searchAddr" className="form-control" onChange={event => this.handleChange(event)} />
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient DOB:</label>
                                <input type="text" name="searchDob" className="form-control" onChange={event => this.handleChange(event)} />
                            </div>

                        </div>
                        <div style={{ 'paddingTop': '7px' }}></div>
                        <button className="btn btn-primary" onClick={() => this.handleShow()}>Add a Patient</button>
                        <button className="btn btn-light ml-2" onClick={() => this.props.logout()}>Sign Out</button>
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
                            <input type="text" name="newName" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient Address:</label>
                            <span>         </span>
                            <input type="text" name="newAddr" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient DOB:</label>
                            <span>         </span>
                            <input type="text" name="newDob" onChange={event => this.handleChange(event)}/>
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
