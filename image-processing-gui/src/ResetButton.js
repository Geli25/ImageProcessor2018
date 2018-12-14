import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

const ResetButton = props => (
    <Button
        color="danger"
        disabled={props.masterLoading}
        onClick={props.reset}>Reset session</Button>
);

const mapStatetoProps=reduxState=>{
    return{
        masterloading:reduxState.userInfo.loading
    }
}


export default connect(mapStatetoProps)(ResetButton);
