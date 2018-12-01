import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateful/SelectImages';

class Input extends Component {
    state = {
        loading: false,
        sent: false
    }
    
    render() {
        let content = (
            <Fragment>
                <Welcome />
                <Instructions />
                <SelectImages />
            </Fragment>
        );
        
        if (this.state.sent===true){
            content = (
                <Redirect to="/" />
            )
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Input;