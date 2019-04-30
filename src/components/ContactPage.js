import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { TeamCard } from './TeamCard';
import MEMBERS from '../members.json';

export class ContactPage extends Component {
    render() {
        let members = MEMBERS.map((member, i) => <TeamCard info={member} key={i} />)
        return (
            <Jumbotron>
                <h1>Meet Team Gravity</h1>
                <p className="text-left">
                    The creators behind Team Gravity are a group of four Informatics students at the University of Washington who are passionate about changing the United States healthcare 
                    landscape to better serve both patients and providers. This project was created for the Information School 2019 Capstone Event and will be expanded on next year by 
                    a new group of Informatics students. 
                </p>
                <CardDeck>
                    {members}
                </CardDeck>
                <p></p>
                <h1>Contact Us</h1>
                <p className="text-left">
                    If you have any feedback on our website or product,
                    feel free to contact Team Gravity at <a href="mailto:gravity.ischool@gmail.com" target="_top">gravity.ischool@gmail.com</a>
                </p>
            </Jumbotron>
        );
    }
}
