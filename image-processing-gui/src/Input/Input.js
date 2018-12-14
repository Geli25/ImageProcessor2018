import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../store/actions/userInfo';
import {Line} from 'rc-progress';
import {Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import Welcome from './Stateless/Welcome';
import Instructions from './Stateless/Instructions';
import SelectImages from './Stateless/SelectImages';
import Options from './Stateless/Options';
import Instruction2 from './Stateless/Instruction2';

class Input extends Component {

    state = {
        loading:false,
        percent:0,
        color:"#FFA07A",
        jsonData:{
            "files":[],
            "HE":true,
            "CS":false,
            "LC":false,
            "RV":false,
            "GC":false,
            "uuid":null,
            "fileNames": [],
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps!==this.props||nextState!==this.state;
    }

    componentWillMount(){
        this.setState(prevState=>
            {
                return{
                    jsonData:{
                        ...prevState.jsonData,
                        "uuid":this.props.uuid
                    }
                }
        });
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
                                ],
                                "fileNames":[
                                    ...prevState.jsonData["fileNames"],
                                    file["name"]
                                ]
                            }
                        }
                    })
                }
            }
        })
    }

    // sortFileNames=()=>{
    //     for (let name of this.props.fileNames){
    //         if (name in )
    //     }
    // }

    submitButton=()=>{
    //    **this is a fake simulation to test out functionality**
    //     if (this.props.sentStatus===true){
    //         let newData = {
    //             "uuid": this.props.uuid,
    //             "HE": this.state.jsonData.HE,
    //             "CS": this.state.jsonData.CS,
    //             "LC": this.state.jsonData.LC,
    //             "RV": this.state.jsonData.RV,
    //             "selectedFilename": this.props.selectedFiles,
    //         }
    //         this.props.setLoading(true);
    //         this.setState({
    //             loading: true},
    //         ()=>console.log(newData));
    //         this.props.setRedirect(true);

    //     }
    //     else{
    //         this.setState({ loading: true }, () => {
    //             console.log(this.state);
    //             console.log(this.props.uuid);
    //         })
    //         this.props.setLoading(true);
    //         this.props.sent();
    //         this.props.updateFileNames(this.state.jsonData.fileNames);
    //         this.props.setRedirect(true);
    //     }
    // }
    if (this.props.sentStatus===true){
        this.props.setLoading(true);
        this.setState({ loading: true });
        console.log(this.state.jsonData.uuid);
        // this.props.setLoading(true);
        let newData = {
            "uuid": this.props.uuid,
            "HE": this.state.jsonData.HE,
            "CS": this.state.jsonData.CS,
            "LC": this.state.jsonData.LC,
            "RV": this.state.jsonData.RV,
            "GC":this.state.jsonData.GC,
            "selectedFilename": this.props.selectedFiles
        }
        axios.post('https://vcm-7506.vm.duke.edu:443/update_user_request', newData, {
            onUploadProgress: progressEvent => {
                let progressPercent = (progressEvent.loaded / progressEvent.total)*100;
                this.setState({percent:progressPercent},()=>{
                    console.log(progressPercent);
                });
                if (progressPercent > 30) {
                    this.setState({ color: "#33A1FF" });
                }
                if (progressPercent > 70) {
                    this.setState({ color: "#4BCE97" });
                }
            }
        }).then(response => {
            this.props.refreshedData(true);
            this.props.setLoading(false);
            this.setState({ loading: false, percent:0, color:"#FFA07A" }, () => {
                console.log(newData, response);
            });
            this.props.setRedirect(true);
        }).catch(err => {
            console.log(newData);
            this.props.setLoading(false);
            this.setState({ loading: false, percent:0, color:"#FFA07A" });
            alert("Something went wrong, please try again. Error: " + err);
        })
    }
    else{
        this.props.setLoading(true);
        this.setState({loading:true});
        axios.post('https://vcm-7506.vm.duke.edu:443/new_user_request', this.state.jsonData, {
            onUploadProgress: progressEvent => {
                let progressPercent = (progressEvent.loaded / progressEvent.total)*100;
                this.setState({percent:progressPercent});
                if (progressPercent>30){
                    this.setState({ color:"#33A1FF"});
                }
                if (progressPercent>70){
                    this.setState({ color:"	#4BCE97"});
                }
                console.log(progressPercent);
            }
        }).then(response => {
            this.props.updateFileNames(response.data.file_names);
            this.setState({ loading: false, percent:0, color:"#FFA07A" });
            this.props.sent();
            this.props.setLoading(false);
            console.log(this.state.jsonData, response.data.file_names);
            this.props.setRedirect(true);
        }).catch(err => {
            this.props.setLoading(false);
            console.log(this.state);
            this.setState({ loading: false, percent:0, color:"#FFA07A" });
            alert("Something went wrong, please try again. Error: " + err);
        })
    }
}


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
            if (this.props.selectedFiles.length === 0 || ((!this.state.jsonData["HE"]
                && !this.state.jsonData["CS"]
                && !this.state.jsonData["RV"]
                && !this.state.jsonData["LC"]))){
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
                {this.state.loading 
                    ? <Line strokeWidth="1" strokeColor={this.state.color} percent={this.state.percent} width="50%" />
                    : <Button color="success" disabled={disable} onClick={this.submitButton}>Submit</Button>}
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
        uuid: reduxState.userInfo.uuid,
        sentStatus:reduxState.userInfo.sent,
        redirectActive:reduxState.userInfo.redirect,
        fileNames:reduxState.userInfo.fileNames,
        selectedFiles:reduxState.selectedfiles.selectedFiles
    }
}

const mapDispatchtoProps=dispatch=>{
    return{
        setLoading: (bool) => dispatch(actionCreators.setLoading(bool)),
        refreshedData: (bool) => dispatch(actionCreators.refreshedData(bool)),
        sent: () => dispatch(actionCreators.sentTrue()),
        setRedirect: (bool) => dispatch(actionCreators.setRedirect(bool)),
        updateFileNames: (files) => dispatch(actionCreators.updateFileNames(files)),
        setReset: (bool) => dispatch(actionCreators.setReset(bool)),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Input);