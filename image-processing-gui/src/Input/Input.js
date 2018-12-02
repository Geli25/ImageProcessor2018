import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {Line} from 'rc-progress';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateless/SelectImages';
import Options from './Stateless/Options';

class Input extends Component {
    state = {
        loading:false,
        percentage:null,
        jsonData:{
            "files":[],
            "HE":true,
            "CS":false,
            "LC":false,
            "RV":false,
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
                            jsonData: {
                                ...prevState.jsonData,
                                "files": [
                                    ...prevState.jsonData["files"],
                                    reader.result
                                ]
                            }
                        }
                    })
                }
            }
        })
    }

    submitButton=()=>{
        this.setState({loading:true},()=>{
            console.log(this.state);
        })
        // axios.post('gs://bmetester-484d1.appspot.com',this.state.jsonData,{
        //     onUploadProgress: progressEvent => {
        //         let progressPercent = (progressEvent.loaded / progressEvent.total)*100;
        //         this.setState({percentage:progressPercent},()=>{
        //             console.log(progressPercent);
        //         });
        //     }
        // }).then(response=>{
        //     this.setState({loading:false});
        //     console.log(response);
        // }).catch(err=>{
        //     this.setState({loading:false});
        //     console.log(err);
        // })
    }

    render() {
        let disable = false;
        if (this.state.jsonData["files"].length===0){
            disable=true;
        }

        let content = (
            <Fragment>
                <Welcome />
                <Instructions />
                <SelectImages
                    updateFile={this.fileUpdate} />
                <Options 
                    toggle={this.optionToggle}
                    optionData={this.state.jsonData} />
                {this.state.loading ? <Line style={{height:'20px'}} percent={this.state.percentage} strokeWidth="6" strokeColor="black" /> : <button disabled={disable} onClick={this.submitButton}>Submit</button>}
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