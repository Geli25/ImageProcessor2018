import * as actionTypes from './actionTypes';

export const updateImagePairs = (pairs) => {
    return {
        type: actionTypes.UPDATE_IMAGE_PAIRS,
        imagePairs: pairs
    }
}

export const updateImageSizes = (sizes) => {
    return {
        type: actionTypes.UPDATE_IMAGE_SIZES,
        imageSizes: sizes
    }
}

export const updateImageNames = (types) => {
    return {
        type: actionTypes.UPDATE_IMAGE_NAMES,
        imageNames: types
    }
}

export const updateProcessingTime = (time) => {
    return {
        type: actionTypes.UPDATE_PROCESSING_TIME,
        processingTime: time
    }
}

export const updateHistograms=(histograms)=>{
    return{
        type:actionTypes.UPDATE_HISTOGRAMS,
        histograms:histograms
    }
}

export const updateUploadTime=(time)=>{
    return{
        type:actionTypes.UPDATE_UPLOAD_TIME,
        uploadTime:time
    }
}

export const clearReturnedData=()=>{
    return{
        type:actionTypes.CLEAR_RETURNED_DATA
    }
}

export const waitForProcessedImage=(pairs)=>dispatch=>{
    return new Promise((resolve)=>{
        dispatch(updateImagePairs(pairs));
        resolve();
    })
}