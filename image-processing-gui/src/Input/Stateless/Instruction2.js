import React, { Fragment } from 'react';
import NamesofImages from './NameofImage';
import './instruction2.css'

const Instruction2 = (props) => {
    return (
        <Fragment>
        <p className="instruction2">You have uploaded files for processing. You can only
            upload once per session, please if you
            would like to reupload files, please click on
            the 'Restart Session'button below.</p>
            <ul>
                Files uploaded:
                <NamesofImages />
            </ul>
            <p>With these files, you can choose to reprocess uploaded files by reselecting
            the options below.</p>
        </Fragment>
    );
}

export default Instruction2;