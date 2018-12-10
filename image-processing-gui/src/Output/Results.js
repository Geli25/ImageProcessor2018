import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import ProcessedImages from './ProcessedImages';


const Results=props=>{
    return(
        <Fragment>
            <h2>Your processed images are shown below:</h2>
            <p>This processing took a total of [time]</p>
            <ProcessedImages />
        </Fragment >
    )
}

const mapStatetoProps=reduxState=>{
    return{
        ProcessingTime: reduxState.returnedData.processingTime
    }
}

export default connect(mapStatetoProps)(Results);