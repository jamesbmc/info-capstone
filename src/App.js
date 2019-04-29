import React, { Component } from 'react';
import './App.css';
import { Navigation } from './Navigation';
import { Main } from './Main';

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
        document.title = "Project Gravity";
    }
}

export default App;
