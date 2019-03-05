import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ischool from './ischool.jpg';

export class TeamCard extends Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.info.img} />
                <Card.Body>
                    <Card.Title>{this.props.info.name}</Card.Title>
                    <Card.Text className="text-left">
                        {this.props.info.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <img style={{ width: '100%' }} src={ischool} alt="iSchool logo" />
                </Card.Footer>
            </Card>
        );
    }
}
