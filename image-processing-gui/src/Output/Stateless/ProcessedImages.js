import React from 'react';
import {connect} from 'react-redux';
import './ProcessedImages.css';

import ImagePairs from './ImagePairs';
import HistogramGroup from './HistogramGroup';
import EachDropDownButton from '../Stateful/EachDropDownButton';

const ProcessedImages=props=>{
    return (
        props.imagePairs.map(pair=>{
            let index = props.imagePairs.indexOf(pair);
            let name = props.imageNames[index];
            let fileName = name.substr(0,name.indexOf('.'));
            let size = props.imageSizes[index];
            let histogram=props.histograms[index];
            let formats=[".jpeg",".png",".tiff"];

            for (let type of pair[1]){
                let typeIndex=pair[1].indexOf(type);
                let b64 = type.substr(type.indexOf(','));
                if (formats[typeIndex]===".jpeg"){
                    props.zip(b64,fileName+formats[typeIndex],"jpeg");
                }
                if (formats[typeIndex]===".png"){
                    props.zip(b64,fileName+formats[typeIndex],"png");
                }
                if (formats[typeIndex]===".tiff"){
                    props.zip(b64,fileName+formats[typeIndex],"tiff");
                }
            }

            return(
                <div className="eachGroup" key={Math.random()}>
                    {/* Images */}
                    <ImagePairs pair={pair} size={size} />

                    {/* Histograms */}
                    {props.histogram ? <HistogramGroup histogram={histogram} /> : null}

                    {/* Download Button */}
                    <EachDropDownButton pair={pair} name={name} download={props.download} />
                    {/* <button type="button" onClick={() => props.download(pair[1], "processed_"+name)}>Download processed image</button> */}
                </div >
            )
        }
    ))
}

const mapStatetoProps = reduxState => {
    return {
        imagePairs: reduxState.returnedData.imagePairs,
        imageSizes: reduxState.returnedData.imageSizes,
        imageNames: reduxState.returnedData.imageNames,
        histograms: reduxState.returnedData.histograms
    }
}

export default connect(mapStatetoProps)(ProcessedImages);