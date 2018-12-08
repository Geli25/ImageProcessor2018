import React from 'react';
import {connect} from 'react-redux';

const NamesofImages = (props) => {
    return (
        props.allNames.map(name=>{
            return(
                <li key={name}>{name}</li>
            )
        })
    );
}

const mapStatetoProps=reduxState=>{
    return{
        allNames:reduxState.userInfo.fileNames
    }
}

export default connect(mapStatetoProps)(NamesofImages);