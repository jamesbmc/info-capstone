import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class OverviewPage extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Project Gravity</h1>
                <h3>Advocating for <b>pulling</b> together electronic health records solutions across the United States.</h3>
                <p className="text-left">
                    The problem of information sharing across different hospitals and healthcare systems is a huge issue in the medical field. 
                    Hospitals use many types of electronic health records (EHR) solutions that do not communicate well with each other, so transmission of patient records
                    becomes tedious and challenging. Interoperability is a problem that many hospitals face, which is the problem of EHRs from one hospital system
                    being unable to interact with an EHR from another system. To solve this problem, legislation needs to be created to either mandate a single EHR for all United
                    States hospitals to use or enforce interoperability standards. We have built a platform to facilitate discussion around the standardization of healthcare record 
                    formats and transmission of those documents. Our goal is creating an accessible repository with information as to why this consolidation is a worthy cause, and
                    a place to start a discussion on how to achieve mandatory consolidation or interoperability standards through reaching out to state and national legislators.
                </p>
            </Jumbotron>
        );
    }
}
