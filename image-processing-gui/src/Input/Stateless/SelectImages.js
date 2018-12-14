import React, { Fragment } from 'react';

const SelectImages = props =>(
    <Fragment>
        <input 
            type="file"  
            onChange={props.updateFile}
            accept=".jpg, .jpeg, .zip, .png, .tif, .tiff"
            multiple />
        <br />
    </Fragment>
);

export default SelectImages;