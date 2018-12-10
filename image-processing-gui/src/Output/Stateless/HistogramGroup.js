import React from 'react';
import { DensitySeries, XAxis, YAxis } from '@data-ui/histogram';
import ResponsiveHistogram from './ResponsiveHisto';

const HistogramGroup = props => {
    return (
        <div className="histograms">
            <h5>Color histograms</h5>
            <div className="histogram">
                <ResponsiveHistogram
                    ariaLabel="My histogram of ..."
                    orientation={["vertical", "horizontal"]}
                    cumulative={false}
                    normalized={true}
                    binCount={25}
                    valueAccessor={datum => datum}
                    binType="numeric"
                    renderTooltip={({ event, datum, data, color }) => (
                        <div>
                            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                            <div><strong>count </strong>{datum.count}</div>
                            <div><strong>cumulative </strong>{datum.cumulative}</div>
                            <div><strong>density </strong>{datum.density}</div>
                        </div>
                    )}
                >
                    <DensitySeries
                        showLine={false}
                        fillOpacity={0.7}
                        smoothing={0.01}
                        fill="blue"
                        animated
                        kernel="parabolic"
                        rawData={props.histogram[0][2] /* or binnedData={...} */}
                    />
                    <DensitySeries
                        showLine={false}
                        fillOpacity={0.7}
                        smoothing={0.01}
                        fill="red"
                        animated
                        kernel="parabolic"
                        rawData={props.histogram[0][0] /* or binnedData={...} */}
                    />
                    <DensitySeries
                        animated
                        showLine={false}
                        fillOpacity={0.9}
                        smoothing={0.01}
                        fill="green"
                        kernel="parabolic"
                        rawData={props.histogram[0][1] /* or binnedData={...} */}
                    />
                    <XAxis label="RGB Level" />
                    <YAxis label="Pixels"/>
                </ResponsiveHistogram>
            </div>

            <div className="histogram">
                <ResponsiveHistogram
                    orientation="vertical"
                    cumulative={false}
                    normalized={true}
                    binCount={25}
                    valueAccessor={datum => datum}
                    binType="numeric"
                    renderTooltip={({ event, datum, data, color }) => (
                        <div>
                            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                            <div><strong>count </strong>{datum.count}</div>
                            <div><strong>cumulative </strong>{datum.cumulative}</div>
                            <div><strong>density </strong>{datum.density}</div>
                        </div>
                    )}
                >
                    <DensitySeries
                        animated
                        fillOpacity={0.2}
                        showLine={false}
                        smoothing={0.01}
                        fill="grey"
                        stroke="grey"
                        kernel="parabolic"
                        rawData={props.histogram[1] /* or binnedData={...} */}
                    />
                    <XAxis label="Intensity" />
                    <YAxis label="Pixels"/>
                </ResponsiveHistogram>
            </div>
        </div>
    )
};

export default HistogramGroup;