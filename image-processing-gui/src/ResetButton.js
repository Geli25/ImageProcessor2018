import React from 'react';
import {connect} from 'react-redux';

const ResetButton = props => (
    <button
        disabled={props.masterLoading}
        onClick={props.reset}>Reset session</button>
);

const mapStatetoProps=reduxState=>{
    return{
        masterloading:reduxState.userInfo.loading
    }
}


export default connect(mapStatetoProps)(ResetButton);
