import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Auth } from '../Auth';
import { Forum } from './forum/Forum';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        // Listen to state authentication state change
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });
            } else {
                this.setState({ user: null });
            }
        });
    }

    logout() {
        firebase.auth().signOut().catch(error => {
            // An error happened
            console.log(error);
        });
    }

    render() {
        return (
            <Grid fluid className="forum-container">
                <Row>
                    <Col mdOffset={1} xs={12} md={10}>
                    {!this.state.user && <Auth />}
                    {this.state.user && <Forum logout={() => this.logout()} />}
                    </Col>
                </Row>

            </Grid>
        );
    }
}
