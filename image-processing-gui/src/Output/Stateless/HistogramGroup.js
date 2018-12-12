import React, {Fragment} from 'react';
import { BarSeries, XAxis, YAxis } from '@data-ui/histogram';
import ResponsiveHistogram from './ResponsiveHisto';

const HistogramGroup = props =>{
    console.log(props.histogram);
    return (
        <div className="histograms">
            <h5>Color histograms</h5>
            {props.histogram.length === 4 ? 
            <Fragment>
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
                        fill="red"
                        animated
                        binnedData={props.histogram[0]}
                    // props.histogram[0][0]} /* or binnedData={...} */
                    />
                    <BarSeries
                        animated
                        showLine={false}
                        fillOpacity={0.9}
                        smoothing={0.01}
                        fill="green"
                        binnedData={props.histogram[1] /* or binnedData={...} */}
                    />
                    <BarSeries
                        showLine={false}
                        fillOpacity={0.9}
                        smoothing={0.01}
                        fill="blue"
                        animated
                        binnedData={props.histogram[2] /* or binnedData={...} */}
                    />
                    <XAxis label="RGB Level" />
                    <YAxis label="Pixels" />
                </ResponsiveHistogram>
                </div>

                <div className="histogram">
                    <ResponsiveHistogram
                        orientation="vertical"
                        cumulative={false}
                        normalized={true}
                        binCount={255}
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
                        <BarSeries
                            animated
                            fillOpacity={0.2}
                            showLine={false}
                            smoothing={0.01}
                            fill="grey"
                            stroke="grey"
                            binnedData={props.histogram[3] /* or binnedData={...} */}
                        // binnedData={[{
                        //     "id": 1,
                        //     "bin0": 1,
                        //     "bin1": 2,
                        //     "count": 2,
                        // },{
                        //     "id":0,
                        //     "bin0":6,
                        //     "bin1":7,
                        //     "count":10,
                        // }]}
                        />
                        <XAxis label="Intensity" />
                        <YAxis label="Pixels" />
                    </ResponsiveHistogram>
                    </div>
                    </Fragment> 
                    : 
                    <Fragment>
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
                            binnedData={props.histogram[0] /* or binnedData={...} */}
                        />
                        <XAxis label="RGB Level" />
                        <YAxis label="Pixels" />
                    </ResponsiveHistogram>
                </div>

                <div className="histogram">
                    <ResponsiveHistogram
                        orientation="vertical"
                        cumulative={false}
                        normalized={true}
                        binCount={255}
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
                        <BarSeries
                            animated
                            fillOpacity={0.2}
                            showLine={false}
                            smoothing={0.01}
                            fill="grey"
                            stroke="grey"
                            binnedData={props.histogram[1] /* or binnedData={...} */}
                        // binnedData={[{
                        //     "id": 1,
                        //     "bin0": 1,
                        //     "bin1": 2,
                        //     "count": 2,
                        // },{
                        //     "id":0,
                        //     "bin0":6,
                        //     "bin1":7,
                        //     "count":10,
                        // }]}
                        />
                        <XAxis label="Intensity" />
                        <YAxis label="Pixels" />
                    </ResponsiveHistogram>
                    </div></Fragment>
                }
           
        </div>
    )
};

export default HistogramGroup;