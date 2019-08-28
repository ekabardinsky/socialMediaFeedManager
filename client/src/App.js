import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Accounts from './pages/Accounts';
import Integrations from './pages/Integrations';
import Videos from './pages/Videos';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => <Accounts/>}/>
                <Route exact path='/accounts' render={() => <Accounts/>}/>
                <Route exact path='/integrations' render={() => <Integrations/>}/>
                <Route exact path='/videos' render={() => <Videos/>}/>
            </Switch>
        );
    }
}