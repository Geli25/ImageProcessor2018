import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import './ProcessedImages.css';


const ProcessedImages=props=>{
    return (
        props.imagePairs.map(pair=>{
            let index = props.imagePairs.indexOf(pair);
            let name=props.imageNames[index];
            return(
                <Fragment key={Math.random()}>
                    <div className="imagePairs">
                        <img alt="originalImage" width="auto" height="200px" src={[pair[0]]} />
                        <img alt="processedImage" width="auto" height="200px" src={[pair[1]]} />
                    </div>
                    <button type="button" onClick={() => props.download(pair[1], "processed_"+name)}>Download processed file</button>
                </Fragment >
            )
        }
    ))
}

const mapStatetoProps = reduxState => {
    return {
        imagePairs: reduxState.returnedData.imagePairs,
        imageSizes: reduxState.returnedData.imageSizes,
        imageNames: reduxState.returnedData.imageNames
    }
}

export default connect(mapStatetoProps)(ProcessedImages);