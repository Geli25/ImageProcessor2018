import React, { Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/userInfo';
import * as actionCreator from '../store/actions/returnedData';
import Loader from '../UI/Loader';

class Output extends Component {
    state={
        loading:false
    }

    componentWillMount(){
        if (this.props.sentStatus){
            this.setState({loading:true});
            //this.retrieveData();
        }
    }

    componentDidMount(){
        this.props.setRedirect(false);
    }

    retrieveData=()=>{
        //axios get 
        // axios
        //set states in redux
    }


    render() {
        let content = (
            <h2>The result of processing goes here.</h2>
        )
        if (this.props.sentStatus&&this.state.loading){
            content=(
                <Fragment>
                <h2>Files are posted, getting your data...</h2>
                <Loader />
                </Fragment>
            )
        }
        if (this.props.gotData){
            content=(
                <Fragment>
                    <h2>You have new requests posted, click below to refresh your results</h2>
                    <button>Refresh Results</button>
                </Fragment>
            )
        }
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
        sentStatus:reduxState.userInfo.sent,
        resetRedirect: reduxState.userInfo.resetRedirect,
        hasData:reduxState.userInfo.gotData,
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        setRedirect:(bool)=>dispatch(actionCreators.setRedirect(bool)),
        gotData:()=>dispatch(actionCreators.gotData()),
        updateImagePairs:(pairs)=>dispatch(actionCreator.updateImagePairs(pairs)),
        updateImageSizes:(sizes)=>dispatch(actionCreator.updateImageSizes(sizes)),
        updateProcessingTime:(time)=>dispatch(actionCreator.updateProcessingTime(time)),
        updateImageTypes:(types)=>dispatch(actionCreator.updateImageTypes(types))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Output);