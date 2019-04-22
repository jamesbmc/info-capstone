import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

export class Post extends Component {
    render() {
        return (
          <div>
            <div align='left' style={{backgroundColor: '#eee', padding: '1rem'}}>
                <h3 style={{display: 'inline'}}>{this.props.info.title}</h3>
                <p style={{display: 'inline', 'marginLeft': '3rem'}}>{this.props.info.author + ", " + this.props.info.date}</p>
            </div>
            <div style={{paddingBottom: '.5rem'}}></div>
            </div>
        )
    }
}
