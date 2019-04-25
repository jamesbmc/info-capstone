import React, { Component } from 'react';

export class Comment extends Component {
    render() {
        return (
            <div>
                <p>{this.props.info.creator + ": " + this.props.info.body}</p>
            </div>
        )
    }
}
