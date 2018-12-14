import React from 'react';
import './ProcessedImages.css';

const ImagePairs = props => {
    return (
        <div className="imagePairs">
            <div className="pair">
                <img alt="originalImage" width="225px" height="auto" src={props.pair[0]} />
                <p>Size: {props.size[0][0]} x {props.size[0][1]} pixels</p>
            </div>
            <div className="pair">
                <img alt="processedImage" width="225px" height="auto" src={props.pair[1][2]} />
                <p>Size: {props.size[1][0]} x {props.size[1][1]} pixels</p>
            </div>
        </div>
    )
};

export default ImagePairs;