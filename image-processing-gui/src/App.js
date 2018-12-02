import React, { Component } from 'react'; 
import {Route, withRouter, Switch} from 'react-router-dom';
import NavBar from './Navigation/NavBarWrapper';
import Input from './Input/Input';
import Output from './Output/Output';
import './App.css';

class App extends Component {
    state = {
        loading: false,
        sent: false,
        uuid: null
    }

    componentWillMount(){
        const uuidv4 = require('uuid/v4');
        let newUuid = uuidv4();
        this.setState({ uuid: newUuid });
    }

    render() {
        let allRoutes = (
            <Switch>
                <Route path="/" exact component={() => <Input uuid={this.state.uuid} />} />
                {/* for passing props */}
                <Route path="/results" exact component={() => <Output uuid={this.state.uuid} />} />
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