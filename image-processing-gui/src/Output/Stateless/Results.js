import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import ProcessedImages from './ProcessedImages';


const Results=props=>{
    return(
        <Fragment>
            <p>This processing took a total of <b>{props.processingTime}</b></p>
            <h2>Your processed images are shown below:</h2>
            <button onClick={props.all}>Download all processed files</button>
            <ProcessedImages zip={props.zip} download={props.download} />
        </Fragment >
    )
}

const mapStatetoProps=reduxState=>{
    return{
        processingTime: reduxState.returnedData.processingTime
    }
}

export default connect(mapStatetoProps)(Results);