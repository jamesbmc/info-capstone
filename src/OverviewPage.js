import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class OverviewPage extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Project Gravity</h1>
                <p className="text-left">
                    Information sharing is a huge issue in the medical field. Hospitals use different information storage systems that do not communicate and so must rely upon faxing paper records. This is  prone to data loss and slow since information must be re-entered through scanning or by hand upon arrival. We have built a platform to facilitate discussion around the standardization of healthcare record formats and transmission of those documents. Our goal is an accessible repository as to why this consolidation is worthy cause and how to achieve it through reaching out to state legislators.
                </p>
            </Jumbotron>
        );
    }
}
