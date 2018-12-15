import React from 'react';
import { BarSeries, XAxis, YAxis } from '@data-ui/histogram';
import ResponsiveHistogram from './ResponsiveHisto';

const ColoredHistoPair = props => {
    console.log(props.histogram);
    return (
        <div className="histograms">
            <div className="histogram">
                <ResponsiveHistogram
                    ariaLabel="My histogram of ..."
                    orientation={["vertical", "horizontal"]}
                    binType="numeric"
                    renderTooltip={({ event, datum, data, color }) => (
                        <div>
                            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                            <div><strong>count </strong>{datum.count}</div>
                            <div><strong>cumulative </strong>{datum.cumulative}</div>
                        </div>
                    )}
                >
                    <BarSeries
                        showLine={false}
                        fillOpacity={0.9}
                        smoothing={0.01}
                        fill="grey"
                        animated
                        binnedData={props.histogram[0]}
                    />
                    <XAxis label="RGB Level" />
                    <YAxis label="Pixels" />
                </ResponsiveHistogram>
            </div>

            <div className="histogram">
                <ResponsiveHistogram
                    ariaLabel="My histogram of ..."
                    orientation={["vertical", "horizontal"]}
                    binType="numeric"
                    renderTooltip={({ event, datum, data, color }) => (
                        <div>
                            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                            <div><strong>count </strong>{datum.count}</div>
                            <div><strong>cumulative </strong>{datum.cumulative}</div>
                        </div>
                    )}
                >
                    <BarSeries
                        animated
                        fillOpacity={0.2}
                        showLine={false}
                        smoothing={0.01}
                        fill="grey"
                        stroke="grey"
                        binnedData={props.histogram[1]}
                    />
                    <XAxis label="Intensity" />
                    <YAxis label="Pixels" />
                </ResponsiveHistogram>
            </div>
        </div>
    )
};

export default ColoredHistoPair;