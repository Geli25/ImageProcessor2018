import * as actionTypes from '../actions/actionTypes';
import stateUpdater from '../../utility/stateUpdater';

const initialState={
    loading:false,
    uuid:null,
    redirectActive:false,
    sent:false,
    gotData:false,
    resetRedirect:false,
    fileNames:[]
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
                gotData:false
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
                redirect:action.redirect
            })
        case actionTypes.UPDATE_FILENAMES:{
            return stateUpdater(curState,{
                fileNames:action.fileNames
            })
        }
        case actionTypes.SET_RESET:{
            return stateUpdater(curState,{
                resetRedirect:false
            })
        }
        case actionTypes.GOT_DATA:{
            return stateUpdater(curState,{
                gotData:action.gotData
            })
        }
        default:
            return curState;
    }
}

export default reducer;