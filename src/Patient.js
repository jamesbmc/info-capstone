import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import icon from './patient.jpg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Record } from './Record';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

export class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            records: []
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleDelete() {
        firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.props.info.id).remove();
        this.state.records.forEach(record => firebase.storage().ref(firebase.auth().currentUser.uid + '/' + this.props.info.id).child(record).delete());
        this.handleClose();
    }

    handleUpload() {
        if (typeof this.state.file === "undefined") {
            alert("You must select a file!");
            return;
        }
        this.storageRef.child(this.state.file.name).put(this.state.file);
        this.state.records.push(this.state.file.name);
        let unique = Array.from(new Set(this.state.records));
        this.patientRef.update({records: unique});
    }

    handleFiles(event) {
        this.setState({file: event.target.files[0]});
    }

    handleFileDelete(name) {
        this.storageRef.child(name).delete();
        let removed = this.state.records.filter(record => record !== name);
        this.patientRef.update({records: removed});
    }

    handleDownload(name) {
        this.storageRef.child(name).getDownloadURL().then(url => window.open(url, '_blank'));
    }

    componentDidMount() {
        this.patientRef = firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.props.info.id);
        this.storageRef = firebase.storage().ref(firebase.auth().currentUser.uid + '/' + this.props.info.id);

        this.patientRef.on('value', (snapshot) => {
            let patient = snapshot.val();
            if (patient !== null) {
                this.setState({
                    records: (typeof patient.records != 'undefined') ? patient.records : []
                });
            }
        });
    }

    render() {
        let records = this.state.records.map((name, i) => <Record key={i} name={name} remove={name => this.handleFileDelete(name)} download={name => this.handleDownload(name)} />);
        return (
            <div>
                <div className="col-sm-6 col-md-4 col-lg-2 mb-3">
                    <Card style={{ width: '14rem' }} onClick={() => this.handleShow()}>
                        <Card.Img variant="top" src={icon} />
                        <Card.Body>
                            <Card.Title>{this.props.info.name}</Card.Title>
                            <div>{this.props.info.addr}</div>
                            <div>{this.props.info.dob}</div>
                        </Card.Body>
                    </Card>
                </div>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Records for {this.props.info.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            {records}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-12">
                            <input type="file" id="myFile" onChange={event => this.handleFiles(event)} />
                            <Button variant="secondary" onClick={() => this.handleUpload()}>
                                Upload Record
                            </Button>
                            <Button variant="secondary" onClick={() => this.handleDelete()}>
                                Delete Patient
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
