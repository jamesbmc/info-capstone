import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import { OverviewPage } from './OverviewPage';
import { ContactPage } from './ContactPage';
import { DemoPage } from './DemoPage';
import { PostBody } from './PostBody';

export class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={OverviewPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/demo' component={DemoPage} />
                <Route path='/demo/:id' component={PostBody} />
            </Switch>
        );
    }
}
