import React, { Component, Fragment } from 'react';

class Upload extends Component {
    state = {
        selectedFiles:[],
        filesSelected:false,
    }

    fileChange = (event) => {
        let files = event.target.files;
        for (let file of files){
            this.setState((prevState)=>{
                return{
                    selectedFiles:[...prevState.selectedFiles, file]
                }
            }, ()=>{
                console.log(this.state.selectedFiles);
            })
        }
        this.setState({filesSelected:true},()=>{
            console.log(this.state.filesSelected);
        })
    }

    render() {
        return (
            <Fragment>
                <input 
                    type="file"  
                    onChange={this.fileChange}
                    accept=".jpg, .jpeg, .zip, .png, .tiff"
                    multiple />
                <br />
                <button>Upload</button>
            </Fragment>
        );
    }
}

export default Upload;