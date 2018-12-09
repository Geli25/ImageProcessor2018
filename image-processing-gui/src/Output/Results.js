import React, { Fragment } from 'react';
import {connect} from 'react-redux';

const Results = (props) => {
    return (
        <Fragment>
            <h1>Result</h1>
        </Fragment>
    );
}

const mapStatetoProps=reduxState=>{
    return{
        imagePairs: reduxState.returnedData.imagePairs,
        imageSizes: reduxState.returnedData.imageSizes,
        ProcessingTime: reduxState.returnedData.processingTime,
        imageTypes: reduxState.returnedData.imageTypes
    }
}

export default connect(mapStatetoProps)(Results);