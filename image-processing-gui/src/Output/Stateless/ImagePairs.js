import React from 'react';
import './ProcessedImages.css';

const ImagePairs = props => {
    return (
        <div className="imagePairs">
            <div className="pair">
                <img alt="originalImage" width="auto" height="200px" src={props.pair[0]} />
                <p>Size: {props.size[0]}</p>
            </div>
            <div className="pair">
                <img alt="processedImage" width="auto" height="200px" src={props.pair[1][0]} />
                <p>Size: {props.size[1]}</p>
            </div>
        </div>
    )
};

export default ImagePairs;