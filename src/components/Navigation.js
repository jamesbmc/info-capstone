import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export class Navigation extends Component {
    render() {

        return (
            <AppBar position="static" color="default" className="app-bar">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className="app-bar-title">
                        <Link to="/">Gravity</Link>
                    </Typography>
                    <Button component={Link} to="/contact">About</Button>
                    <Button component={Link} to="/demo">Forum</Button>
                    <Button component={Link} to="/">Resources</Button> {/* todo: update link */}
                    <Button color="primary" variant="outlined"> {/* todo: this should open a modal with signup form */}
                        Become a Member
          </Button>
                </Toolbar>
            </AppBar>
        );
    }
}
