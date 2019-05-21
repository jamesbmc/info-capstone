import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import { OverviewPage } from './components/OverviewPage';
import { ContactPage } from './components/ContactPage';
import { DemoPage } from './components/DemoPage';
import { PostBody } from './components/forum/PostBody';
import { uploadImages } from './components/forum/uploadImages';

export class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={OverviewPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/demo' component={DemoPage} />
                <Route path='/demo/:id' component={PostBody} />
                <Route path='/upload' component={uploadImages}/>
            </Switch>
        );
    }
}
