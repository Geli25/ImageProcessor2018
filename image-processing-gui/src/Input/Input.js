import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateful/SelectImages';
import Options from './Stateless/Options';

class Input extends Component {
    state = {
        loading: false,
        sent: false,
        jsonData:{
            "files":[],
            "HE":true,
            "CS":false,
            "LC":false,
            "RV":false,
            "time":null
        }
    }
    
    optionToggle=(option)=>{
        this.setState(prevState=>{
            return{
                jsonData:{
                    ...prevState.jsonData,
                    [option]:!prevState.jsonData[option]
                }
            }
        })
    }

    render() {
        let content = (
            <Fragment>
                <Welcome />
                <Instructions />
                <SelectImages />
                <Options 
                    toggle={this.optionToggle}
                    optionData={this.state.jsonData} />
                <button>Submit</button>
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