import React, {Fragment} from 'react';
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
            let fileName = name.substr(0, name.indexOf('.'));
            let size = props.imageSizes[index];
            let histogram=props.histograms[index];
            let formats=[".jpeg",".tif",".png"];

            for (let type of pair[1]){
                let typeIndex=pair[1].indexOf(type);
                let b64 = type.substr(type.indexOf(','));
                if (formats[typeIndex]===".jpeg"){
                    props.zip(b64,fileName+formats[typeIndex],"jpeg");
                }
                if (formats[typeIndex]===".png"){
                    props.zip(b64,fileName+formats[typeIndex],"png");
                }
                if (formats[typeIndex]===".tif"){
                    props.zip(b64,fileName+formats[typeIndex],"tiff");
                }
            }

            return(
                <div className="eachGroup" key={Math.random()}>
                    {name==="undefined"
                        ? null
                        : <Fragment>
                            <ImagePairs pair={pair} size={size} />
                            {props.histoDisplay ? <HistogramGroup histogram={histogram} /> : null}
                            <EachDropDownButton pair={pair} name={name} download={props.download} />
                        </Fragment>}
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
        histograms: reduxState.returnedData.histograms,
        histoDisplay:reduxState.userInfo.histoDisplay
    }
}

export default connect(mapStatetoProps)(ProcessedImages);