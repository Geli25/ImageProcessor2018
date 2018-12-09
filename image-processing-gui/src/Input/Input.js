import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../store/actions/userInfo';
import Loader from './../UI/Loader';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateless/SelectImages';
import Options from './Stateless/Options';
import Instruction2 from './Stateless/Instruction2';

class Input extends Component {

    state = {
        loading:false,
        jsonData:{
            "files":[],
            "HE":true,
            "CS":false,
            "LC":false,
            "RV":false,
            "uuid":this.props.uuid,
            "fileNames": [],
        }
    }

    componentWillMount(){
        this.props.setReset();
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
        console.log(files);
        this.setState(prevState=>{
            return{
                jsonData:{
                    ...prevState.jsonData,
                    "files":[],
                    "fileNames":[]
                }
            }
        },()=>{
            for (let file of files) {
                this.setState(prevState => {
                    return {
                        jsonData: {
                            ...prevState.jsonData,
                            "fileNames": [
                                ...prevState.jsonData["fileNames"],
                                file["name"]
                            ]
                        }
                    }
                });
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
        if (this.props.sentStatus===true){
            let newData = {
                "uuid": this.props.uuid,
                "HE": this.state.jsonData.HE,
                "CS": this.state.jsonData.CS,
                "LC": this.state.jsonData.LC,
                "RV": this.state.jsonData.RV,
                "selectedFilename": this.props.selectedFiles,
            }
            this.props.setLoading(true);
            this.setState({
                loading: true},
            ()=>console.log(newData));
            this.props.setRedirect(true);

        }
        else{
            this.setState({ loading: true }, () => {
                console.log(this.state);
            })
            this.props.setLoading(true);
            this.props.sent();
            this.props.updateFileNames(this.state.jsonData.fileNames);
            this.props.setRedirect(true);
        }
    }
    // if (this.props.sentStatus===true){
    //     this.setState({ loading: true });
    //     // this.props.setLoading(true);
    //     let newData = {
    //         "uuid": this.props.uuid,
    //         "HE": this.state.jsonData.HE,
    //         "CS": this.state.jsonData.CS,
    //         "LC": this.state.jsonData.LC,
    //         "RV": this.state.jsonData.RV,
    //         "selectedFilename": this.props.selectedFiles
    //     }
    //     axios.post('http://127.0.0.1:5000/new_data', newData, {
    //         onUploadProgress: progressEvent => {
    //             let progressPercent = (progressEvent.loaded / progressEvent.total);
    //             console.log(progressPercent);
    //         }
    //     }).then(response => {
    //         this.props.setLoading(false);
    //         this.setState({ loading: false }, () => {
    //             console.log(newData, response);
    //         });
    //         this.props.setRedirect(true);
    //     }).catch(err => {
    //         this.props.setLoading(false);
    //         this.setState({ loading: false });
    //         alert("Something went wrong, please try again. Error: " + err);
    //     })
    // }
    // else{
    //     this.props.setLoading(true);
    //     this.setState({loading:true});
    //     axios.post('http://vcm-7506.vm.duke.edu:5000/new_user', this.state.jsonData, {
    //         onUploadProgress: progressEvent => {
    //             let progressPercent = (progressEvent.loaded / progressEvent.total);
    //             console.log(progressPercent);
    //         }
    //     }).then(response => {
    //         this.setState({loading: false})
    //         this.props.sent();
    //         this.props.setLoading(false);
    //         console.log(this.state.jsonData, response);
    //         this.props.updateFileNames(this.state.jsonData.fileNames);
    //         this.props.setRedirect(true);
    //     }).catch(err => {
    //         this.props.setLoading(false);
    //         console.log(this.state);
    //         this.setState({loading:false});
    //         alert("Something went wrong, please try again. Error: " + err);
    //     })
    // }
// }


    render() {
        let disable = false;
        if (!this.props.sentStatus){
            if (this.state.jsonData["files"].length === 0 
            || this.state.jsonData["files"].length > 10 
                || (!this.state.jsonData["HE"] 
                && !this.state.jsonData["CS"] 
                && !this.state.jsonData["RV"]
                && !this.state.jsonData["LC"])){
                disable=true;
            }
        }
        else if (this.props.sentStatus){
            if (this.props.selectedFiles.length===0){
                disable=true
            }
        }

        let content = (
            <Fragment>
                <Welcome />
                <Instructions />
                {this.props.sentStatus ? <Instruction2 /> 
                : <SelectImages
                    updateFile={this.fileUpdate} />}
                <Options 

                    toggle={this.optionToggle}
                    optionData={this.state.jsonData} />
                {this.state.loading ? <Loader /> : <button disabled={disable} onClick={this.submitButton}>Submit</button>}
            </Fragment>
        );
        if (this.props.redirectActive) {
            content = <Redirect to="/results" />
        }
        

        return (
            <div>
                {content}
            </div>
        );
    }
}
const mapStatetoProps=reduxState=>{
    return{
        sentStatus:reduxState.userInfo.sent,
        uuid:reduxState.userInfo.uuid,
        redirectActive:reduxState.userInfo.redirect,
        fileNames:reduxState.userInfo.fileNames,
        selectedFiles:reduxState.selectedfiles.selectedFiles
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        setLoading: (bool) => dispatch(actionCreators.setLoading(bool)),
        sent: () => dispatch(actionCreators.sentTrue()),
        setRedirect: (bool) => dispatch(actionCreators.setRedirect(bool)),
        updateFileNames: (files) => dispatch(actionCreators.updateFileNames(files)),
        setReset: (bool) => dispatch(actionCreators.setReset(bool))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Input);