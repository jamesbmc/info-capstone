import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class ContactPage extends Component {
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
