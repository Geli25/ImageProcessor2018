import React, { Component } from 'react';
import {connect} from 'react-redux';
import NamesofImages from './NameofImage';
import './instruction2.css'

class Checkboxes extends Component {
    state = {
        selectAll: false
    }
    render() {
        return (
                <ul>
                    Files Uploaded:
                    <br />
                    <input
                        className="checkbox"
                        id="all"
                        defaultChecked={true}
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
        filenames: reduxState.userInfo.filenames,
        selectedFiles:reduxState.selectedfiles.selectedFiles
    }
}

export default connect(mapStatetoProps)(Checkboxes);