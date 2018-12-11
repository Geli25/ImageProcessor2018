import React, { Fragment } from 'react';
import './instruction2.css';

const Options = props => {
    return (
        <Fragment>
            <h4>Choose your options for processing:</h4>
			
			
			<div class="wrap">
			<div class="block">
            <input
                type="checkbox"
				name="check" 
				value="check"
                checked={props.optionData.HE}
                id="HE"
                onChange={()=>props.toggle("HE")} />
            <label  for="check" htmlFor="HE">Histogram Equalization</label>
			</div>
			
			<div class="block">
			<input
                type="checkbox"
				name="check" 
				value="check"
                checked={props.optionData.CS}
                id="CS"
                onChange={()=>props.toggle("CS")} />
            <label for="check" htmlFor="CS">Contrast Stretching</label>  
			</div>

			<div class="block">
            <input
                type="checkbox"
				name="check" 
				value="check"
                checked={props.optionData.LC}
                id="LC"
                onChange={()=>props.toggle("LC")} />
            <label for="check" htmlFor="LC">Log Compression</label>
			</div>
            
			<div class="block">
            <input
                type="checkbox"
				name="check" 
				value="check"
                checked={props.optionData.RV}
                id="RV"
                onChange={()=>props.toggle("RV")} />
            <label  for="check" htmlFor="RV">Reverse Video</label>
			</div>
			</div>
            <br />
            <br />
        </Fragment>
    );
}


export default Options;