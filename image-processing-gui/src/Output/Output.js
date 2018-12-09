import React, { Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../store/actions/userInfo';
import {connect} from 'react-redux';

class Output extends Component {

    componentDidMount(){
        this.props.setRedirect(false);
    }

    render() {
        let content = (
            <h2>The result of processing goes here.</h2>
        )
        if (this.props.resetRedirect){
            content=<Redirect to="/" />
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStatetoProps=reduxState=>{
    return{
        resetRedirect: reduxState.userInfo.resetRedirect
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        setRedirect:(bool)=>dispatch(actionCreators.setRedirect(bool))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Output);