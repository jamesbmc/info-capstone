import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class Resources extends Component {
    render() {
        return (
            <Grid fluid className="main-container">
                <h1>Resources</h1>
                <p>Links to external research and websites related to Project Gravity.</p>
                <h4>Electronic Health/Medical Records</h4>
                <ul>
                    <li><a href="https://www.usfhealthonline.com/resources/key-concepts/ehr-vs-emr/">Differences Between Electronic Health and Electronic Medical Records - USF Health</a></li>
                    <li><a href="https://www.cms.gov/medicare/e-health/ehealthrecords/index.html">Electronic Health Records - CMS.gov</a></li>
                    <li><a href="https://www.aafp.org/practice-management/health-it/product/intro.html">Introduction to Electronic Health Records - AAFP</a></li>
                </ul>
                <h4>Universal Electronic Medical Records</h4>
                <ul>
                    <li><a href="https://www.healthit.gov/topic/health-it-basics/benefits-ehrs">Benefits of Electronic Health Records Systems - HealthIT.gov</a></li>
                    <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3088297/">Developing Universal Electronic Medical Records - NCBI</a></li>
                    <li><a href="https://healthitanalytics.com/news/are-universal-ehrs-key-to-healthcare-value-trust-and-ai-adoption">Universal EHRs and Value, Trust, and AI Adoption - HealthITAnalytics</a></li>
                    <li><a href="https://www.himss.org/news/year-universal-medical-record-sharing">Universal Medical Record Sharing - HIMSS</a></li>
                </ul>
                <h4>Interoperability Standards</h4>
                <ul>
                    <li><a href="https://ehrintelligence.com/features/breakdown-of-health-it-interoperability-standards-organizations">Breakdown of Health IT Interoperability Standards and Organizations - EHR Intelligence</a></li>
                    <li><a href="https://healthitanalytics.com/news/data-standards-security-key-to-healthcare-interoperability">Data Standards, Security Key to Healthcare Interoperability - HealthITAnalytics</a></li>
                </ul>
            </Grid>
        );
    }
}