import React, { Fragment } from 'react';

const Options = props => {
    return (
        <Fragment>
            <h4>Choose your options for processing:</h4>
            <input
                type="checkbox"
                checked={props.optionData.HE}
                id="HE"
                onChange={()=>props.toggle("HE")} />
            <label htmlFor="HE">Histogram Equalization</label>

            <input
                type="checkbox"
                checked={props.optionData.CS}
                id="CS"
                onChange={()=>props.toggle("CS")} />
            <label htmlFor="CS">Contrast Stretching</label>  

            <input
                type="checkbox"
                checked={props.optionData.LC}
                id="LC"
                onChange={()=>props.toggle("LC")} />
            <label htmlFor="LC">Log Compression</label>
            
            <input
                type="checkbox"
                checked={props.optionData.RV}
                name="RV"
                onChange={()=>props.toggle("RV")} />
            <label htmlFor="RV">Reverse Video</label>
            <br />
            <br />
        </Fragment>
    );
}


export default Options;