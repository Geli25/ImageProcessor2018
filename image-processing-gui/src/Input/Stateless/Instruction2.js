import React, { Fragment } from 'react';
import './instruction2.css'
import Checkboxes from './Checkboxes';

const Instruction2 = (props) => {
    return (
        <Fragment>
        <p className="instruction2">You have uploaded files for processing. You can only
                upload once per session, please if you
                would like to reupload files, please click on
                the <b>'Restart Session'</b> button below.</p>
        <br />
        <p className="instruction2">You can choose to reprocess uploaded files by reselecting
        the options below. If some files are corrupt or not the accepted format,
        they may not be uploaded successfully. Below are the successfully uploaded
        images that you can choose to reprocessed. All .zip files are unzipped.</p>
        <Checkboxes />
        </Fragment>
    );
}

export default Instruction2;