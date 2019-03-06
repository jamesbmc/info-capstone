import React, { Component } from 'react';

export class Record extends Component {

    render() {
        return (
            <div className="col-sm-6 col-md-4 col-lg-2 mb-3">
                <img style={{ width: '25%' }} src="https://img.icons8.com/cotton/2x/cancel.png" alt="Delete button" align="right" onClick={(name) => this.props.remove(this.props.name)} />
                <img style={{ width: '100%' }} src="https://openclipart.org/download/237988/text70.svg" alt="File clipart" />
                <p className="text-center">{this.props.name}</p>
            </div>
        );
    }
}
