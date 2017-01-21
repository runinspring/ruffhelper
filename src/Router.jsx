import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import MainShell from './component/MainShell.jsx';
import Loading from './component/Loading.jsx';
import TestUI from './component/TestUI.jsx';
//import createHashHistory from 'history/lib/createHashHistory';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
//var history = createBrowserHistory();
//window.appHistory = history;
export class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        //console.log('AppRouter');
        window.location.href = '#/';
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/">
                    <IndexRoute component={Loading}/>
                    <Route path="main" component={MainShell}/>
                    <Route path="test" component={TestUI}/>
                </Route>
            </Router>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
class About extends React.Component {
    render() {
        return (<div>Coming soon</div>)
    }
}