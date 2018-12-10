import React from 'react';
import './instruction2.css';

const Options = props => {
    return (
        <div className="options">
            <h5>Choose your options for processing:</h5>
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
        </div>
    );
}


export default Options;