import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateful/SelectImages';
import Options from './Stateless/Options';

class Input extends Component {
    state = {
        jsonData:{
            "files":[],
            "HE":true,
            "CS":false,
            "LC":false,
            "RV":false,
            "time":null,
            "uuid":this.props.uuid,
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

    fileUpdate = (event) => {
        let files = event.target.files;
        this.setState(prevState=>{
            return{
                jsonData:{
                    ...prevState.jsonData,
                    "files":[]
                }
            }
        },()=>{
            for (let file of files) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.setState(prevState => {
                        return {
                            selected: true,
                            jsonData: {
                                ...prevState.jsonData,
                                "files": [
                                    ...prevState.jsonData["files"],
                                    reader.result
                                ]
                            }
                        }
                    }, () => {
                        console.log(this.state);
                    })
                }
            }
        })
    }

    render() {
        let content = (
            <Fragment>
                <Welcome />
                <Instructions />
                <SelectImages
                    updateFile={this.fileUpdate} />
                <Options 
                    toggle={this.optionToggle}
                    optionData={this.state.jsonData} />
                <button>Submit</button>
            </Fragment>
        );
        
        if (this.state.sent===true){
            content = (
                <Redirect to="/results" />
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