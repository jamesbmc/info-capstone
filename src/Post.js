import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

export class Post extends Component {
    render() {
        let upvotes = typeof this.props.info.upvotes === "undefined" ? 0 : this.props.info.upvotes.length;
        let downvotes = typeof this.props.info.downvotes === "undefined" ? 0 : this.props.info.downvotes.length;
        let total = upvotes - downvotes;
        return (
          <div>
            <div align='left' style={{backgroundColor: '#eee', padding: '1rem'}}>
                <p style={{display: 'inline', color: total >= 0 ? 'green' : 'red'}}>{total}</p>
                <h3 style={{display: 'inline', 'marginLeft': '3rem'}}>{this.props.info.title}</h3>
                <p style={{display: 'inline', 'float': 'right'}}>{this.props.info.author + ", " + this.props.info.date}</p>
            </div>
            <div style={{paddingBottom: '.5rem'}}></div>
            </div>
        )
    }
}
