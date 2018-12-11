import React from 'react';
import {connect} from 'react-redux';
import './App.css';
const ResetButton = props => (
<div className="reset">
    <button 
	className = "button"
	disabled={props.masterLoading}
     onClick={props.reset}>
	 <a className="alertText">Reset session</a>
	 </button>
	 </div>
);

const mapStatetoProps=reduxState=>{
    return{
        masterloading:reduxState.userInfo.loading
    }
}


export default connect(mapStatetoProps)(ResetButton);
