import React from 'react';

import ColoredHistoPair from './ColoredHistoPair';
import MonochromeHistoPair from './MonochromeHistoPair'


const HistogramGroup = props =>{
    console.log(props.histogram);
    return (
        <div className="histograms">
            {props.histogram.length === 4 ? <ColoredHistoPair histogram={props.histogram} />
            : <MonochromeHistoPair histogram={props.histogram} />}
        </div>
    )
};

export default HistogramGroup;