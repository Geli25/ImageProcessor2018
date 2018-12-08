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
        if (this.props.allNames.length===1) {
            this.props.addSelected(this.props.allNames[0]);
        }
    }

    render(){
        let checked=null;
        let disabled=false
        if (this.props.allNames.length===1||this.props.all){
            checked=true;
        }
        else if (this.props.allNames.length==1){
            disabled=true;
        }
        else if (!this.props.all){
            checked=false;
        }
        return(
            this.props.allNames.map(name=>{
                return(
                    <li key={name}> 
                        <input
                            type="checkbox"
                            id={name}
                            checked={checked}
                            disabled={disabled}
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