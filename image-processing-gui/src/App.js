import React, { Component, Fragment } from 'react'; 
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';

import * as actionCreators from './store/actions/userInfo';
import {clearSelected} from './store/actions/selectedFiles';
import NavBar from './Navigation/NavBarWrapper';
import Input from './Input/Input';
import Output from './Output/Output';
import './App.css';
import ResetButton from './ResetButton';

class App extends Component {
    state = {
        uuid: null,
    }

    resetApp=()=>{
        const uuidv4 = require('uuid/v4');
        let newUuid = uuidv4();
        this.props.resetApp(newUuid);
        this.props.clearSelected();
        this.setState({ uuid: newUuid })
        console.log(newUuid);
        if (this.state.uuid !== null) {
            alert("Session reset successful!");
        }
    }

    alertReset=()=>{
        confirmAlert({
            message: "Are you sure you want to reset this session? All your processed data will be lost.",
            customUI: ({ message, onClose }) => (
                <div className="resetUI">
                    <div className="alertText">
                        <h3>{message}</h3>
                    </div>
                    <div className="alertButton">
                    <button onClick={()=>{
                        onClose();
                        this.resetApp();}}>Yes</button>
                    <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            )
        })
    }

    componentWillMount() {
        this.resetApp();
    }

    render() {
        let allRoutes = (
            <Fragment>
            <Switch>
                <Route path="/" exact component={() => <Input 
                 />} />
                <Route path="/results" exact component={() => <Output 
                uuid={this.state.uuid} />} />
            </Switch>
            <br />
            <ResetButton reset={this.alertReset} />
            </Fragment>
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

const mapDispatchtoProps=dispatch=>{
    return{
        resetApp:(uuid)=>dispatch(actionCreators.resetApp(uuid)),
        clearSelected:()=>dispatch(clearSelected()),
    }
}

export default withRouter(connect(null,mapDispatchtoProps)(App));