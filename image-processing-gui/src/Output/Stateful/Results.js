import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {toggleHistoDisplay} from '../../store/actions/userInfo';
import ProcessedImages from '../Stateless/ProcessedImages';
import DownloadAllButton from './DownloadAllButton';

import FileSaver from 'file-saver';
import JSZip from 'jszip';

let zipJ = new JSZip();
let zipP = new JSZip();
let zipT = new JSZip();

class Results extends Component{
    toggleHisto=()=>{
        this.props.toggleDisplay();
    }

    downloadClick = (img64, name) => {
        FileSaver.saveAs(img64, name);
    }

    zipFiles=(img64,name,type)=>{
        if (type==="jpeg"){
            zipJ.file("processed_" + name, img64, { base64: true });
        }
        if (type==="png"){
            zipP.file("processed_" + name, img64, { base64: true })
        }
        if (type==="tiff"){
            zipT.file("processed_" + name, img64, { base64: true })
        }
    }

    downloadAll = (type) => {
        if (type==="jpeg"){
            zipJ.generateAsync({ type: "blob" }).then(
                (content) => {
                    FileSaver.saveAs(content, "processed_files_jpg.zip");
                }
            );
        }
        if (type==="png"){
            zipP.generateAsync({ type: "blob" }).then(
                (content) => {
                    FileSaver.saveAs(content, "processed_files_png.zip");
                }
            );
        }
        if (type==="tiff"){
            zipT.generateAsync({ type: "blob" }).then(
                (content) => {
                    FileSaver.saveAs(content, "processed_files_png.zip");
                }
            );
        }
    }

    render(){
        return(
            <Fragment>
                <h4>This processing took a total of <b>{this.props.processingTime}</b></h4>
                <br />
                <DownloadAllButton dlall={this.downloadAll} />
                <br />
                <h5>Your processed images are shown below:</h5>
                <input id="histogram" type="checkbox" onChange={this.toggleHisto} checked={this.props.histoDisplay} />
                <label htmlFor="histogram">Show color analysis histogram</label>
                <ProcessedImages 
                    zip={this.zipFiles}
                    download={this.downloadClick} />
            </Fragment >
        )
    }
}

const mapStatetoProps=reduxState=>{
    return{
        processingTime: reduxState.returnedData.processingTime,
        histoDisplay:reduxState.userInfo.histoDisplay
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        toggleDisplay:()=>dispatch(toggleHistoDisplay()),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Results);