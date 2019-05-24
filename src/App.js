import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' },
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
