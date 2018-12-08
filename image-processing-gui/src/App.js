import React, { Component } from 'react'; 
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/userInfo';
import {clearSelected} from './store/actions/selectedFiles';
import NavBar from './Navigation/NavBarWrapper';
import Input from './Input/Input';
import Output from './Output/Output';
import './App.css';
import ResetButton from './ResetButton';

class App extends Component {
    state = {
        uuid: null
    }

    resetApp=()=>{
        const uuidv4 = require('uuid/v4');
        let newUuid = uuidv4();
        this.props.resetApp(newUuid);
        this.props.clearSelected();
        this.setState({uuid:newUuid})
        console.log(newUuid);
        if (this.state.uuid!==null){
        alert("Session reset successful!")};
    }

    componentWillMount() {
        this.resetApp();
    }

    render() {
        let allRoutes = (
            <Switch>
                <Route path="/" exact component={() => <Input 
                 />} />
                <Route path="/results" exact component={() => <Output 
                uuid={this.state.uuid} />} />
            </Switch>
        );

        return (
            <div className="app">
                <NavBar>
                    {allRoutes}
                </NavBar>
                <br />
                <ResetButton reset={this.resetApp} />
                <br />
                <br />
            </div>
        );
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        resetApp:(uuid)=>dispatch(actionCreators.resetApp(uuid)),
        clearSelected:()=>dispatch(clearSelected())
    }
}

export default withRouter(connect(null,mapDispatchtoProps)(App));