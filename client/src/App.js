import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Accounts from './pages/Accounts';
import Integrations from './pages/Integrations';
import Videos from './pages/Videos';

export default class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Accounts}/>
                    <Route exact path='/accounts' component={Accounts}/>
                    <Route exact path='/integrations' component={Integrations}/>
                    <Route exact path='/videos' component={Videos}/>
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}