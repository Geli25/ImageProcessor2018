import * as actionTypes from '../actions/actionTypes';
import stateUpdater from '../../utility/stateUpdater';

const initialState={
    loading:false,
    redirectActive:false,
    sent:false,
    gotData:false,
    histoDisplay:false,
    resetRedirect:false,
    fileNames:[],
    uuid:null,
    refreshedData:false
}

const reducer=(curState=initialState,action)=>{
    switch (action.type){
        case actionTypes.RESET_APP:
            return stateUpdater(curState,{
                uuid:action.uuid,
                loading:false,
                redirectActive:false,
                sent:false,
                fileNames:[],
                resetRedirect:true,
                gotData:false,
                histoDisplay:false,
                refreshedData: false
            })
        case actionTypes.SET_LOADING:
            return stateUpdater(curState,{
                loading:action.loading
            })
        case actionTypes.SENT_TRUE:
            return stateUpdater(curState,{
                sent:true
            })
        case actionTypes.SET_REDIRECT:
            return stateUpdater(curState,{
                redirectActive:action.redirect
            })
        case actionTypes.UPDATE_FILENAMES:{
            return stateUpdater(curState,{
                fileNames:action.fileNames
            })
        }
        case actionTypes.SET_RESET:{
            return stateUpdater(curState,{
                resetRedirect:action.redirect
            })
        }
        case actionTypes.GOT_DATA:{
            return stateUpdater(curState,{
                gotData:action.gotData
            })
        }
        case actionTypes.TOGGLE_HISTO_DISPLAY:{
            return stateUpdater(curState,{
                histoDisplay:!curState.histoDisplay
            })
        }
        case actionTypes.REFRESHED_DATA:{
            return stateUpdater(curState,{
                refreshedData: action.refreshedData
            })
        }
        default:
            return curState;
    }
}

export default reducer;