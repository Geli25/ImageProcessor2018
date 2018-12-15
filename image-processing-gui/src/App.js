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
import {Button} from 'reactstrap';
import ResetButton from './ResetButton';

class App extends Component {
    state = {
        uuid: null,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    resetApp=()=>{
        this.props.resetApp();
        this.props.clearSelected();
        this.setState({ uuid: this.props.uuid  })
        console.log(this.props.uuid);
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
                    <Button color="success" onClick={()=>{
                        onClose();
                        this.resetApp();}}>Yes</Button>
                    <Button color="danger" onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            )
        })
    }

    componentDidMount() {
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
            <br />
            <br />
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

const mapStatetoProps=reduxState=>{
    return{
        uuid:reduxState.userInfo.uuid
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        resetApp:(uuid)=>dispatch(actionCreators.resetApp(uuid)),
        clearSelected:()=>dispatch(clearSelected()),
    }
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(App));