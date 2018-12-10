import React, { Fragment } from 'react';
import {connect} from 'react-redux';


const ProcessedImages=props=>{
    // var afterDot = str.substr(str.indexOf('.')); for getting types
    const state={
        "imageSizes":[500,500],
        "imageNames":["lady.jpg","cat.jpeg"],
    }
    return (
        props.imagePairs.map(pair=>(
        <Fragment>
            <div className="imagePairs">
                <img width="250px" height="auto" src={[pair[0]]} />
                <img width="250px" height="auto" src={[pair[1]]} />
            </div>
            <button type="button" onClick={() => props.download(pair[1], "lady.jpg")}>Click and Download file</button>
        </Fragment >
    )))
}

const mapStatetoProps = reduxState => {
    return {
        imagePairs: reduxState.returnedData.imagePairs,
        imageSizes: reduxState.returnedData.imageSizes,
        imageNames: reduxState.returnedData.imageTypes
    }
}

export default connect(mapStatetoProps)(ProcessedImages);