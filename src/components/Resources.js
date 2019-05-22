import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class Resources extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Resources</h1>
                <p>Links to external research and websites related to Project Gravity.</p>
                <p className="text-left">
                    The creators behind Team Gravity are a group of four Informatics students at the University of Washington who are passionate about changing the United States healthcare 
                    landscape to better serve both patients and providers. This project was created for the Information School 2019 Capstone Event and will be expanded on next year by 
                    a new group of Informatics students. 
                </p>
            </Jumbotron>
        );
    }
}