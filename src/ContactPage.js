import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { TeamCard } from './TeamCard';
import MEMBERS from './members.json';

export class ContactPage extends Component {
    render() {
        let members = MEMBERS.map((member, i) => <TeamCard info={member} key={i} />)
        return (
            <Jumbotron>
                <h1>Meet Team Gravity</h1>
                <p className="text-left">
                    Team Gravity is a group of 4 students at the Information School at the University of Washington. This project is for the iSchool's 2019 capstone.
                </p>
                <CardDeck>
                    {members}
                </CardDeck>
                <p></p>
                <h1>Contact Us</h1>
                <p className="text-left">
                    If you have experience with long-term follow-up care as a patient or in the medical field, or have any feedback on our website or product,
                    feel free to contact Team Gravity at <a href="mailto:gravity.ischool@gmail.com" target="_top">gravity.ischool@gmail.com</a>
                </p>
            </Jumbotron>
        );
    }
}
