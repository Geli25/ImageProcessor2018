import React from 'react';
import './ProcessedImages.css';

const ImagePairs = props => {
    return (
        <div className="imagePairs">
            <img alt="originalImage" width="auto" height="200px" src={props.pair[0]} />
            <img alt="processedImage" width="auto" height="200px" src={props.pair[1]} />
        </div>
    )
};

export default ImagePairs;