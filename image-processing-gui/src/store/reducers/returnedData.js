import * as actionTypes from '../actions/actionTypes';
import stateUpdater from '../../utility/stateUpdater';

const initialState = {
    imagePairs: [],
    imageNames: [],
    processingTime: null,
    imageSizes: [],
    histograms:[]
}

const reducer = (curState = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_IMAGE_PAIRS:
            return stateUpdater(curState, {
                imagePairs:action.imagePairs
            })
        case actionTypes.UPDATE_IMAGE_NAMES:
            return stateUpdater(curState, {
                imageNames:action.imageNames
            })
        case actionTypes.UPDATE_PROCESSING_TIME:
            return stateUpdater(curState, {
                processingTime:action.processingTime
            })
        case actionTypes.UPDATE_IMAGE_SIZE:
            return stateUpdater(curState, {
                imageSizes:action.imageSizes
            })
        case actionTypes.UPDATE_HISTOGRAMS:
            return stateUpdater(curState,{
                histograms:action.histograms
            })
        default:
            return curState;
    }
}

export default reducer;