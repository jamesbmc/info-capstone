import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
    /* theme stuff will go here, see: https://material-ui.com/customization/themes/ */
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Navigation />
                <Main />
            </MuiThemeProvider>
        );
    }
    componentDidMount() {
        document.title = "Project Gravity";
    }
}

export default App;
