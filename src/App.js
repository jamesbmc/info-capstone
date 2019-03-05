import React, { Component } from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <Main />
            </div>
        );
    }
    componentDidMount() {
        document.title = "Team Gravity";
    }
}

class Navigation extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Gravity</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer exact to="/">
                            <Nav.Link>Project Overview</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Meet Team Gravity</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/demo">
                            <Nav.Link>Project Demo</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={OverviewPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/demo' component={DemoPage} />
            </Switch>
        );
    }
}

class OverviewPage extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Project Gravity</h1>
                <p className="text-left">
                    Long-term follow-up care is an important aspect of cancer treatment to identify and summarily treat recurrent cancer.
                    One of the greatest issues facing patients and doctors is the fact that hospitals use paper records to track long-term follow-up care.
                    These documents are hard to transfer to other hospitals and search through for relevant information and easy to lose. There are other solutions
                    aiming to solve this issue but they lack features (e.g. Epic lacks the ability to add doctor notes). At Team Gravity, we aim to fill this gap
                    and provide a comprehensive solution that benefits patients and hospitals alike.
                </p>
            </Jumbotron>
        );
    }
}

class ContactPage extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Meet Team Gravity</h1>
                <p className="text-left">
                    Team Gravity is a group of 4 students at the Information School at the University of Washington. This project is for the iSchool's 2019 capstone.
                </p>
                <CardDeck>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/30652887_2028628760710661_2258698102393274368_o.jpg?_nc_cat=103&_nc_ht=scontent-sea1-1.xx&oh=4c6dc8b366c36b4b7c826f370d6d16e3&oe=5CFA2776" />
                        <Card.Body>
                            <Card.Title>Emily Tao</Card.Title>
                            <Card.Text className="text-left">
                                Emily is a Junior at the iSchool. On Team Gravity, she is a full-stack engineer focused on working with
                                Laura, our UX expert, to ensure a smooth and easy experience for our users.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <img style={{ width: '100%' }} src={require('./ischool.jpg')} alt="iSchool logo" />
                        </Card.Footer>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/32266984_2084220704925489_5229818845539074048_o.jpg?_nc_cat=104&_nc_ht=scontent-sea1-1.xx&oh=558226a32cdc2c7213b20a81ade4b475&oe=5CF0DA32" />
                        <Card.Body>
                            <Card.Title>James McCutcheon</Card.Title>
                            <Card.Text className="text-left">
                                James is a Senior at both the iSchool and the Foster School of Business. His responsibility on Team Gravity
                                is the API server used to encode and store patient data as well as deployment of the API server and the web client.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <img style={{ width: '100%' }} src={require('./ischool.jpg')} alt="iSchool logo" />
                        </Card.Footer>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/20116751_1642372045775035_2774604617716940893_o.jpg?_nc_cat=111&_nc_ht=scontent-sea1-1.xx&oh=e3504525ee6dec7f0ce3974ba1877fc4&oe=5CB7F653" />
                        <Card.Body>
                            <Card.Title>Laura Xiao Lan</Card.Title>
                            <Card.Text className="text-left">
                                Laura is a Senior at the iSchool. Laura is the UX expert on Team Gravity, responsible for making sure
                                that our service provides the best possible experience to users.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <img style={{ width: '100%' }} src={require('./ischool.jpg')} alt="iSchool logo" />
                        </Card.Footer>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/22179926_1666723263380455_8342779119679508220_o.jpg?_nc_cat=107&_nc_ht=scontent-sea1-1.xx&oh=f8654fb637cac2db4d0d44a057f13334&oe=5CF06C4C" />
                        <Card.Body>
                            <Card.Title>Ivan Mireles</Card.Title>
                            <Card.Text className="text-left">
                                Ivan is a Senior at the iSchool. He is the domain expert and a full-stack engineer on Team Gravity, working
                                on all aspects of development as well as reaching out to stakeholders to plan and assess our product.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <img style={{ width: '100%' }} src={require('./ischool.jpg')} alt="iSchool logo" />
                        </Card.Footer>
                    </Card>
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

class DemoPage extends Component {
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
        this.setState({ user: null });
    }

    render() {
        return (
            <div>
                {!this.state.user && <Auth />}
                {this.state.user && <Store />}
            </div>
        );
    }
}

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    // Method for handling someone signing up
    handleSignUp() {

        // Create a new user and save their information
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            // Update the display name of the user
            let profilePromise = firebase.auth().currentUser.updateProfile({
                displayName: this.state.username
            });

            // Return promise for chaining
            return profilePromise;
        })
        .then(() => {
            // Set the state as the current (firebase) user
            this.setState({
                user: firebase.auth().currentUser,
                username: ''
            });
        })
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    }

    // Method for handling someone signing in
    handleSignIn() {
        // Sign in the user
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    }


    render() {
        let errorDiv = this.state.errorMessage === "" ? "" : <div className="alert alert-danger">Error: {this.state.errorMessage}</div>
        return (
            <div className="jumbotron">
                <div className="container">
                    {errorDiv}
                    <div className="Auth">
                        <p>Please sign in or sign up to access patient documents:</p>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <div>
                            <button className="btn btn-dark mr-2 mt-2" onClick={() => this.handleSignIn()}>Sign In</button>
                            <button className="btn btn-outline-secondary mr-2 mt-2" onClick={() => this.handleSignUp()}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            show: false,
            name: "",
            addr: "",
            dob: ""
        };
    }

    componentDidMount() {
        this.queueRef = firebase.database().ref('queue/' + this.props.queueId);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    addPatient() {
        if (this.state.name === "" || this.state.addr === "" || this.state.dob === "") {
            alert("One of the required fields is empty!");
            return;
        } else {
            let patients = this.state.patients;
            let newPatient = {
                name: this.state.name,
                addr: this.state.addr,
                dob: this.state.dob
            }
            patients.push(newPatient);
            this.setState({patients: patients});
            this.handleClose();
        }
    }

    handleChange(event) {
        let field = event.target.name; // which input
        let value = event.target.value; // what value

        let changes = {}; // object to hold changes
        changes[field] = value; // change this field
        this.setState(changes); // update state
    }

    render() {
        let patients = this.state.patients.map((patient, i) => {return <Patient info={patient} key = {i} />});
        return (
            <div>
                <div style={{ 'background-color': 'grey', 'padding-top': '15px', 'padding-bottom': '1px' }}>
                    <div className="form-group">
                        <div className="col-12">

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Name:</label>
                                <input type="text" name="name" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient Address:</label>
                                <input type="text" name="addr" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label style={{ 'color': 'white' }}>Patient DOB:</label>
                                <input type="text" name="dob" className="form-control"/>
                            </div>

                        </div>
                        <div style={{ 'padding-top': '7px' }}></div>
                        <button className="btn btn-primary" onClick={() => this.handleShow()}>Add a Patient</button>
                    </div>
                </div>
                <div className="jumbotron">
                    <div className="row">
                        {patients}
                    </div>

                </div>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Patient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Patient Name:</label>
                            <span>         </span>
                            <input type="text" name="name" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient Address:</label>
                            <span>         </span>
                            <input type="text" name="addr" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div>
                            <label>Patient DOB:</label>
                            <span>         </span>
                            <input type="text" name="dob" onChange={event => this.handleChange(event)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.addPatient()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class Patient extends Component {
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

export default App;
