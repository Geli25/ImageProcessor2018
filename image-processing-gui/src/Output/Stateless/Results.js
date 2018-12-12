import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {toggleHistoDisplay} from '../../store/actions/userInfo';
import ProcessedImages from './ProcessedImages';
import DownloadAllButton from '../Stateful/DownloadAllButton';

const Results = props =>{
    return(
        <Fragment>
            <h4>This processing took a total of <b>{props.processingTime}</b></h4>
            <br />
            <DownloadAllButton dlall={props.downloadAll} />
            <br />
            <h5>Your processed images are shown below:</h5>
            <input id="histogram" type="checkbox" onChange={props.toggleDisplay} checked={props.histoDisplay} />
            <label htmlFor="histogram">Show color analysis histogram</label>
            <ProcessedImages 
                zip={props.zipFiles}
                download={props.downloadClick} />
        </Fragment >
    )
}

const mapStatetoProps=reduxState=>{
    return{
        processingTime: reduxState.returnedData.processingTime,
        histoDisplay:reduxState.userInfo.histoDisplay
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        toggleDisplay:()=>dispatch(toggleHistoDisplay())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Results);