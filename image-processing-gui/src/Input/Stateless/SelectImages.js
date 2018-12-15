import React, { Fragment } from 'react';
import {connect} from 'react-redux';

const SelectImages = props =>(
    <Fragment>
        <input 
            type="file"  
            onChange={props.updateFile}
            disabled={props.masterloading}
            accept=".jpg, .jpeg, .zip, .png, .tif, .tiff"
            multiple />
        <br />
    </Fragment>
);

const mapStatetoProps = reduxState => {
    return {
        masterloading: reduxState.userInfo.loading
    }
}


export default connect(mapStatetoProps)(SelectImages);