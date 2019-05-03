import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#e99185',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          main: '#927682',
        },
        // error: will use the default color
      }
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
