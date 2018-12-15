import * as actionTypes from './actionTypes';

export const resetApp=()=>{
    const uuidv4 = require('uuid/v4');
    let newUuid = uuidv4();
    return{
        type:actionTypes.RESET_APP,
        uuid:newUuid
    }
}

export const setLoading=(loading)=>{
    return{
        type:actionTypes.SET_LOADING,
        loading:loading
    }
}

export const sentTrue=()=>{
    return{
        type:actionTypes.SENT_TRUE
    }
}

export const setRedirect=(redirect)=>{
    return{
        type: actionTypes.SET_REDIRECT,
        redirect:redirect
    }
}

export const updateFileNames=(files)=>{
    return{
        type:actionTypes.UPDATE_FILENAMES,
        fileNames:files
    }
}

export const setReset=(bool)=>{
    return{
        type:actionTypes.SET_RESET,
        redirect:bool
    }
}

export const gotData=(bool)=>{
    return{
        type:actionTypes.GOT_DATA,
        gotData:bool
    }
}

export const toggleHistoDisplay=()=>{
    return{
        type:actionTypes.TOGGLE_HISTO_DISPLAY
    }
}

export const refreshedData=(bool)=>{
    return{
        type:actionTypes.REFRESHED_DATA,
        refreshedData:bool
    }
}