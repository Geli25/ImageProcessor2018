import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import './ProcessedImages.css';

import { DensitySeries, BarSeries, XAxis, YAxis } from '@data-ui/histogram';
import ResponsiveHistogram from './ResponsiveHisto';

const ProcessedImages=props=>{
    const rawData = Array(100).fill().map(Math.random);
    const rawData1 = Array(100).fill().map(Math.random);
    const rawData2 = Array(100).fill().map(Math.random);

    return (
        props.imagePairs.map(pair=>{
            let index = props.imagePairs.indexOf(pair);
            let name=props.imageNames[index];
            return(
                <Fragment key={Math.random()}>
                    {/* Images */}
                    <div className="imagePairs">
                        <img alt="originalImage" width="auto" height="200px" src={[pair[0]]} />
                        <img alt="processedImage" width="auto" height="200px" src={[pair[1]]} />
                    </div>

                    {/* Histograms */}
                    <div className="histograms">
                    <h5>Color histograms</h5>
                    <div className="histogram">
                        <ResponsiveHistogram
                            ariaLabel="My histogram of ..."
                            orientation={["vertical","horizontal"]}
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
                                rawData={rawData /* or binnedData={...} */}
                            />
                            <DensitySeries
                                showLine={false}
                                fillOpacity={0.7}
                                smoothing={0.01}
                                fill="red"
                                animated
                                kernel="parabolic"
                                rawData={rawData1 /* or binnedData={...} */}
                            />
                            <DensitySeries
                                animated
                                showLine={false}
                                fillOpacity={0.9}
                                smoothing={0.01}
                                fill="green"
                                kernel="parabolic"
                                rawData={rawData2 /* or binnedData={...} */}
                            />
                            <XAxis />
                            <YAxis />
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
                                rawData={rawData1 /* or binnedData={...} */}
                            />
                            <XAxis />
                            <YAxis />
                        </ResponsiveHistogram>
                    </div>
                    </div>

                    {/* Download Button */}
                    <button type="button" onClick={() => props.download(pair[1], "processed_"+name)}>Download processed image</button>
                </Fragment >
            )
        }
    ))
}

const mapStatetoProps = reduxState => {
    return {
        imagePairs: reduxState.returnedData.imagePairs,
        imageSizes: reduxState.returnedData.imageSizes,
        imageNames: reduxState.returnedData.imageNames
    }
}

export default connect(mapStatetoProps)(ProcessedImages);