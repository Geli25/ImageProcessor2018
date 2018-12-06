import React, { Fragment } from 'react';

const NamesofImages = (props) => {
    return (
        props.allNames.map(name=>{
            return(
                <li key={name}>{name}</li>
            )
        })
    );
}

export default NamesofImages;