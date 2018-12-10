import React, { Fragment } from 'react';
import {connect} from 'react-redux';


const ProcessedImages=props=>{
    return (
        props.imagePairs.map(pair=>{
            let index = props.imagePairs.indexOf(pair);
            let name=props.imageNames[index];
            return(
                <Fragment key={Math.random()}>
                    <div className="imagePairs">
                        <img alt="originalImage" width="250px" height="auto" src={[pair[0]]} />
                        <img alt="processedImage" width="250px" height="auto" src={[pair[1]]} />
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