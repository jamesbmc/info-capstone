import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#378c0a' },
    secondary: { main: '#acdd8e' },
  },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
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
