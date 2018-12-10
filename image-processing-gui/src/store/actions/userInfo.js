import * as actionTypes from './actionTypes';

export const resetApp=(uuid)=>{
    return{
        type:actionTypes.RESET_APP,
        uuid:uuid
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

export const setReset=()=>{
    return{
        type:actionTypes.SET_RESET
    }
}

export const gotData=(bool)=>{
    return{
        type:actionTypes.GOT_DATA,
        gotData:bool
    }
}
