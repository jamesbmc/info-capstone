import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import { OverviewPage } from './components/OverviewPage';
import { ContactPage } from './components/ContactPage';
import { Resources } from './components/Resources';
import { DemoPage } from './components/DemoPage';
import { PostBody } from './components/forum/PostBody';

export class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={OverviewPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/forum' component={DemoPage} />
                <Route exact path='/resources' component={Resources} />
                <Route path='/forum/:id' component={PostBody} />
            </Switch>
        );
    }
}
