import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import upvote from './upvote.png';
import downvote from './downvote.png';

export class Post extends Component {
    render() {
        let upvotes = typeof this.props.info.upvotes === "undefined" ? 0 : this.props.info.upvotes.length;
        let downvotes = typeof this.props.info.downvotes === "undefined" ? 0 : this.props.info.downvotes.length;
        let total = upvotes - downvotes;
        return (
            <div>
                <Link to={{
                    pathname: "/demo/" + this.props.info.id,
                    state: {
                        username: this.props.username,
                        title: this.props.info.title,
                        author: this.props.info.author,
                        body: this.props.info.body
                    }
                 }} style={{ textDecoration: 'none' }}>
                    <div align='left' style={{backgroundColor: '#eee', padding: '1rem'}}>
                        <img src={upvote} style={{ width: '3%', color: "green" }} alt="Upvote icon" />
                        <p style={{display: 'inline', color: total >= 0 ? 'green' : 'red'}}>{total}</p>
                        <img src={downvote} style={{ width: '3%' }} alt="Downvote icon" />
                        <h3 style={{display: 'inline', 'marginLeft': '3rem', color:'black'}}>{this.props.info.title}</h3>
                        <p style={{display: 'inline', 'float': 'right', color:'black'}}>{this.props.info.author + ", " + this.props.info.date}</p>
                        {this.props.username === this.props.info.author && <p>this will be a delete button</p>}
                    </div>
                    <div style={{paddingBottom: '.5rem'}}>
                    </div>
                </Link>
            </div>
        )
    }
}
