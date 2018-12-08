import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/selectedFiles';
import NamesofImages from './NameofImage';
import './instruction2.css'

class Checkboxes extends Component {
    state = {
        selectAll: false
    }

    selectAllToggle=(e)=>{
        if (e.target.checked) {
            this.props.clearSelected();
            for (let name of this.props.filenames){
                this.props.addSelected(name);
            }
            this.setState({selectAll:true});
        }
        else if (!e.target.checked) {
            this.props.clearSelected();
            this.setState({selectAll:false});
        }
    }

    render() {
        let checked=null;
        if(this.props.filenames.length===1){
            checked="checked";
        }
        return (
                <ul>
                    Files Uploaded:
                    <br />
                    <input
                        className="checkbox"
                        id="all"
                        disabled={checked}
                        checked={checked}
                        onChange={this.selectAllToggle}
                        type="checkbox"
                        label="Select All" />
                    <label htmlFor="all"><b>Select All</b></label>
                    <br />
                    <NamesofImages all={this.state.selectAll} />
                </ul>
        );
    }
}

const mapStatetoProps=reduxState=>{
    return{
        filenames: reduxState.userInfo.fileNames,
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        clearSelected: () => dispatch(actionCreators.clearSelected()),
        addSelected: (filename) => dispatch(actionCreators.addSelected(filename))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkboxes);