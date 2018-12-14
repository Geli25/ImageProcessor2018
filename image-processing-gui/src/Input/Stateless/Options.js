import React from 'react';
import {connect} from 'react-redux';
import './instruction2.css';

const Options = props => {
    return (
        <div className="options">
            <h5>Choose your options for processing:</h5>
            <input
                type="checkbox"
                checked={props.optionData.HE}
                disabled={props.masterloading}
                id="HE"
                onChange={()=>props.toggle("HE")} />
            <label htmlFor="HE">Histogram Equalization</label>
            <input
                type="checkbox"
                checked={props.optionData.CS}
                disabled={props.masterloading}
                id="CS"
                onChange={()=>props.toggle("CS")} />
            <label htmlFor="CS">Contrast Stretching</label>  

            <input
                type="checkbox"
                checked={props.optionData.LC}
                disabled={props.masterloading}
                id="LC"
                onChange={()=>props.toggle("LC")} />
            <label htmlFor="LC">Log Compression</label>
            
            <input
                type="checkbox"
                checked={props.optionData.RV}
                disabled={props.masterloading}
                name="RV"
                onChange={()=>props.toggle("RV")} />
            <label htmlFor="RV">Reverse Video</label>

            <input
                type="checkbox"
                checked={props.optionData.GC}
                disabled={props.masterloading}
                name="GC"
                onChange={() => props.toggle("GC")} />
            <label htmlFor="GC">Gamma Correction</label>
            <br />
            <br />
        </div>
    );
}


const mapStatetoProps = reduxState => {
    return {
        masterloading: reduxState.userInfo.loading
    }
}


export default connect(mapStatetoProps)(Options);