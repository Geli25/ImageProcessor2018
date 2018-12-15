import * as actionTypes from '../actions/actionTypes';
import stateUpdater from '../../utility/stateUpdater';

const initialState={
    selectedFiles:[]
}

const reducer=(curState=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_SELECTED:
            return stateUpdater(curState,{
                selectedFiles:[
                    ...curState.selectedFiles,
                    action.fileName
                ]
            })
        case actionTypes.REMOVE_SELECTED:
            let selectedFilesCopy=[...curState.selectedFiles];
            console.log(selectedFilesCopy);
            let filteredFiles=selectedFilesCopy.filter(name=>{
                return name!==action.fileName
            })
            console.log(filteredFiles);
            return stateUpdater(curState,{
                selectedFiles:filteredFiles
            })
        case actionTypes.CLEAR_SELECTED:
            return stateUpdater(curState,{
                selectedFiles: []
            })
        default:
            return curState;
    }
}

export default reducer;