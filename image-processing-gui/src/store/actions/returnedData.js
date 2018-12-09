import * as actionTypes from './actionTypes';

export const updateImagePairs = (pairs) => {
    return {
        type: actionTypes.UPDATE_IMAGE_PAIRS,
        imagePairs: pairs
    }
}

export const updateImageSizes = (sizes) => {
    return {
        type: actionTypes.UPDATE_IMAGE_SIZE,
        imageSizes: sizes
    }
}

export const updateImageTypes = (types) => {
    return {
        type: actionTypes.UPDATE_IMAGE_TYPES,
        imageTypes: types
    }
}

export const updateProcessingTime = (time) => {
    return {
        type: actionTypes.UPDATE_PROCESSING_TIME,
        processingTime: time
    }
}