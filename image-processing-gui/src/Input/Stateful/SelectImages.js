import React, { Component, Fragment } from 'react';

class SelectImages extends Component {
    state = {
        selectedFiles:[]
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
            </Fragment>
        );
    }
}

export default SelectImages;