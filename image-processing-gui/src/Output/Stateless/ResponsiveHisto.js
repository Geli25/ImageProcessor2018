import React from 'react';
import { Histogram, withParentSize,  } from '@data-ui/histogram';

const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest }) => {

return(
    <Histogram
        width={parentWidth}
        height={parentHeight}
        {...rest}
    />
)});

export default ResponsiveHistogram;