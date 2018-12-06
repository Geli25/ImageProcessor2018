import React, { Component } from 'react'; 
import {Route, withRouter, Switch} from 'react-router-dom';
import NavBar from './Navigation/NavBarWrapper';
import Input from './Input/Input';
import Output from './Output/Output';
import './App.css';

class App extends Component {
    state = {
        uuid: null,
        sent: false,
        redirectActive:false,
        loading:false,
        filenames:[],
    }

    resetApp=()=>{
        const uuidv4 = require('uuid/v4');
        let newUuid = uuidv4();
        this.setState({
            uuid: newUuid,
            sent: false,
            redirectActive: false,
            loading: false,
            filenames: [] }, () => console.log(this.state.uuid));
    }

    loading=()=>{
        this.setState({loading:true})
    }

    notLoading=()=>{
        this.setState({loading:false})
    }

    updateFileNames=(names)=>{
        this.setState({filenames:names, sent:true, redirectActive:true},()=>console.log(this.state))
    }

    // redirectFalse = () => {
    //     this.setState({ redirectActive: false })
    // }

    componentWillMount(){
        this.resetApp();
    }

    // shouldComponentUpdate(_,nextState){
    //     return nextState.redirectActive!==this.state.redirectActive;
    // }


    render() {
        let allRoutes = (
            <Switch>
                <Route path="/" exact component={() => <Input 
                sentStatus={this.state.sent}
                keepFilenames={this.updateFileNames}
                redirect={this.state.redirectActive}
                fileNames={this.state.filenames}
                uploading={this.loading}
                notUploading={this.notLoading}
                toggleSent={this.messageSent}
                uuid={this.state.uuid} />} />
                <Route path="/results" exact component={() => <Output 
                // redirectOff={this.redirectFalse}
                uuid={this.state.uuid} />} />
            </Switch>
        );

        return (
            <div className="app">
                <NavBar>
                    {allRoutes}
                </NavBar>
                <br />
                <button onClick={this.resetApp}>Reset session</button>
                <br />
                <br />
            </div>
        );
    }
}

export default withRouter(App);