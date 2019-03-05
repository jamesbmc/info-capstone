import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class OverviewPage extends Component {
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
