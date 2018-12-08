import React, { Component} from 'react';
import * as actionCreators from '../store/actions/userInfo';
import {connect} from 'react-redux';

class Output extends Component {

    componentDidMount(){
        this.props.setRedirect(false);
    }

    render() {
        return (
            <div>
                <h2>The result of processing goes here.</h2>
            </div>
        );
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        setRedirect:(bool)=>dispatch(actionCreators.setRedirect(bool))
    }
}

export default connect(null,mapDispatchtoProps)(Output);