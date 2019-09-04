import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Accounts from './pages/Accounts';
import Integrations from './pages/Integrations';
import Videos from './pages/Videos';
import Settings from "./pages/Settings";
import styles from './index.scss';
import PublishQueue from "./pages/PublishQueue";
import Login from "./pages/Login";

// eslint-disable-next-line
styles.section;

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => <Accounts/>}/>
                <Route exact path='/accounts' render={() => <Accounts/>}/>
                <Route exact path='/integrations' render={() => <Integrations/>}/>
                <Route exact path='/videos' render={() => <Videos/>}/>
                <Route exact path='/settings' render={() => <Settings/>}/>
                <Route exact path='/publishQueue' render={() => <PublishQueue/>}/>
                <Route exact path='/login' render={() => <Login/>}/>
            </Switch>
        );
    }
}