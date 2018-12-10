import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import ProcessedImages from './ProcessedImages';


const Results=props=>{
    return(
        <Fragment>
            <h2>Your processed images are shown below:</h2>
            <p>This processing took a total of <b>{props.processingTime}</b></p>
            <ProcessedImages download={props.download} />
        </Fragment >
    )
}

const mapStatetoProps=reduxState=>{
    return{
        processingTime: reduxState.returnedData.processingTime
    }
}

export default connect(mapStatetoProps)(Results);