import React, { Component } from 'react';
import Welcome from '../Stateless/Welcome';
import Instructions from '../Stateless/Instructions';
import Upload from '../Stateful/SelectImages';

class Input extends Component {
    state = {
        loading: false,
    }
    render() {
        return (
            <div>
                <Welcome />
                <Instructions />
                <Upload />
            </div>
        );
    }
}

export default Input;