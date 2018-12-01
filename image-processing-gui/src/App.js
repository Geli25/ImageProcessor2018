import React, { Component } from 'react';
import Welcome from './Input/Stateless/Welcome';
import Instructions from './Input/Stateless/Instructions';
import Upload from './Input/Stateful/Upload';
import './App.css'

class App extends Component {
    state ={
        loading: false,
    }
    render() {
        return (
            <div className="App">
            <Welcome />
            <Instructions />
            <Upload />
            </div>
        );
    }
}

export default App;