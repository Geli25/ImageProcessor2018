import React, { Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import * as actionCreators from '../store/actions/userInfo';
import * as actionCreator from '../store/actions/returnedData';
import {connect} from 'react-redux';

class Output extends Component {
    state={
        loading:false
    }

    componentWillMount(){
        if (this.props.sentStatus){
            // axios
            //set states
        }
    }

    componentDidMount(){
        this.props.setRedirect(false);
    }


    render() {
        let content = (
            <h2>The result of processing goes here.</h2>
        )
        if (this.props.sentStatus){
            content=<h2>Files are posted, getting your data...</h2>
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
        imagePairs:reduxState.returnedData.imagePairs,
        imageSizes:reduxState.returnedData.imageSizes,
        ProcessingTime: reduxState.returnedData.processingTime,
        imageTypes:reduxState.returnedData.imageTypes
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