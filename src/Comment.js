import React, { Component } from 'react';

export class Comment extends Component {
    render() {
        return (
            <div>
                <p>{this.props.info}</p>
            </div>
        )
    }
}
