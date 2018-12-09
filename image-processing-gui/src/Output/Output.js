import React, { Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/userInfo';
import * as actionCreator from '../store/actions/returnedData';
import Loader from '../UI/Loader';
import Results from './Results';


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
            <h2>You have not uploaded any files.</h2>
        )
        if (this.props.sentStatus&&this.state.loading){
            content=(
                <Fragment>
                    <h2>Getting your data...</h2>
                    <Loader />
                </Fragment>
            )
        }
        if (this.props.gotData){
            content=(
                <Fragment>
                    <h2>You have posted a new request, click below to refresh your results</h2>
                    <button onClick={}>Refresh Results</button>
                </Fragment>
            )
        }
        if (this.props.resetRedirect){
            content=<Redirect to="/" />
        }
        return (
            <div>
                {content}
                {this.props.sentStatus ? <Results /> : null}
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