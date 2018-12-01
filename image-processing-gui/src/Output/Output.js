import React, { Component} from 'react';

class Output extends Component {
    state = {
        sent: false
    }

    render() {
        return (
            <div>
                <h2>The result of processing goes here.</h2>
            </div>
        );
    }
}

export default Output;