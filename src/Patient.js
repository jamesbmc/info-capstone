import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class Patient extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-4 col-lg-2 mb-3">
                <Card style={{ width: '14rem' }} >
                    <Card.Img variant="top" src="https://www.synbio.cam.ac.uk/images/avatar-generic.jpg/image" />
                    <Card.Body>
                        <Card.Title>{this.props.info.name}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
