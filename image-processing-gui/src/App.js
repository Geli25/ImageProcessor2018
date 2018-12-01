import React, { Component } from 'react'; 
import {Route, withRouter, Switch} from 'react-router-dom';
import NavBar from './Navigation/NavBarWrapper';
import Input from './Input/Input';
import Output from './Output/Output';
import './App.css';

class App extends Component {
    render() {
        let allRoutes = (
            <Switch>
                <Route path="/" exact component={Input} />
                {/* for passing props */}
                <Route path="/results" exact component={()=><Output />} />
            </Switch>
        );

        return (
            <div className="app">
                <NavBar>
                    {allRoutes}
                </NavBar>
            </div>
        );
    }
}

export default withRouter(App);