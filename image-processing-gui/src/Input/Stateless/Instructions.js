import React, { Fragment } from 'react';

const Instructions = (props) => {
    return (
        <Fragment>
           <p>This is a medical image processing app. The accepted file types are:</p>
           <ul>
                <li><b>.jp(e)g</b> files</li>
                <li><b>.png</b> files</li>
                <li><b>.tiff</b> files</li>
                <li><b>.zip</b> files<br />
                    *.zip files must contain images of the above format*
                </li>
           </ul>
           <p><b>You can only upload 10 files at a total of 20mb per session.</b></p>
        </Fragment>
    );
}

export default Instructions;