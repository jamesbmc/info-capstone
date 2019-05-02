import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class OverviewPage extends Component {
    render() {
        return (
            <Grid fluid>
                <Row center="xs" className="splash">
                    <Col lg={8} xs={10}>
                        <div className="main-title">Project Gravity</div>
                        <div className="sub-title">Advocating for pulling together electronic health records solutions across the United States.</div>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={1} xs={12} md={6}>
                        <h1>Together, we can create change and build a better EHR. Join the movement.</h1>
                        <p>Some blurb will probably go here.</p>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="contain-signup">
                        {/*need to add email signup form component*/}
                        This is where the membership signup form will go.
                        </div>
                    </Col>
                </Row>

                <Row>
                    <p>
                        The problem of information sharing across different hospitals and healthcare systems is a huge issue in the medical field.
                        Hospitals use many types of electronic health records (EHR) solutions that do not communicate well with each other, so transmission of patient records
                        becomes tedious and challenging. Interoperability is a problem that many hospitals face, which is the problem of EHRs from one hospital system
                        being unable to interact with an EHR from another system. To solve this problem, legislation needs to be created to either mandate a single EHR for all United
                        States hospitals to use or enforce interoperability standards. We have built a platform to facilitate discussion around the standardization of healthcare record
                        formats and transmission of those documents. Our goal is creating an accessible repository with information as to why this consolidation is a worthy cause, and
                        a place to start a discussion on how to achieve mandatory consolidation or interoperability standards through reaching out to state and national legislators.
                </p>
                </Row>
            </Grid>
        );
    }
}