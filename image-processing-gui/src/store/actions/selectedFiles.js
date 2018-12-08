import * as actionTypes from './actionTypes';

export const addSelected=(filename)=>{
    return{
        type:actionTypes.ADD_SELECTED,
        fileName:filename
    }
}

export const removeSelected=(filename)=>{
    return{
        type:actionTypes.REMOVE_SELECTED,
        fileName:filename
    }
}

export const clearSelected=()=>{
    return{
        type:actionTypes.CLEAR_SELECTED
    }
}