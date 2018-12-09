import * as actionTypes from '../actions/actionTypes';
import stateUpdater from '../../utility/stateUpdater';

const initialState = {
    imagePairs: [],
    imageTypes: [],
    processingTime: null,
    imageSizes: []
}

const reducer = (curState = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_IMAGE_PAIRS:
            return stateUpdater(curState, {
                imagePairs:action.imagePairs
            })
        case actionTypes.UPDATE_IMAGE_TYPES:
            return stateUpdater(curState, {
                imageTypes:action.imageTypes
            })
        case actionTypes.UPDATE_PROCESSING_TIME:
            return stateUpdater(curState, {
                processingTime:action.processingTime
            })
        case actionTypes.UPDATE_IMAGE_SIZE:
            return stateUpdater(curState, {
                imageSizes:action.imageSizes
            })
        default:
            return curState;
    }
}

export default reducer;