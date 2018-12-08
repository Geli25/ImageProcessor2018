import React, {Component, Fragment} from 'react';
import * as actionCreators from '../../store/actions/selectedFiles';
import {connect} from 'react-redux';

class NamesofImages extends Component{

    checkboxHandler=(e)=>{
        if (e.target.checked){
            this.props.addSelected(e.target.id);
        }
        else if (!e.target.checked){
            this.props.removeSelected(e.target.id);
        }
    }

    componentWillMount(){
        this.props.clearSelected();
        for (let name of this.props.allNames) {
            this.props.addSelected(name);
        }
    }

    render(){
        let disable=null;
        if (this.props.allNames.length===1){
            disable=true;
        }
        return(
            this.props.allNames.map(name=>{
                return(
                    <li key={name}> 
                        <input
                            type="checkbox"
                            id={name}
                            defaultChecked={true}
                            disabled={disable}
                            onChange={this.checkboxHandler} />
                        <label htmlFor="HE">{name}</label>
                    </li>
                )
            })
        );
    }
}

const mapStatetoProps=reduxState=>{
    return{
        allNames:reduxState.userInfo.fileNames
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        addSelected:(filename)=>dispatch(actionCreators.addSelected(filename)),
        removeSelected:(filename)=>dispatch(actionCreators.removeSelected(filename)),
        clearSelected:()=>dispatch(actionCreators.clearSelected())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(NamesofImages);