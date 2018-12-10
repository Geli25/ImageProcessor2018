import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class EachDropDownButton extends Component {
    state = {
        open: false
    }

   toggle=()=>{
       this.setState(prevState=>{
           return{
            open:!prevState.open
           }
       })
   }

    render() {
        let fileName = this.props.name.substr(0, this.props.name.indexOf('.'));
        return (
            <div>
                <ButtonDropdown isOpen={this.state.open} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Download as...
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem 
                            onClick={() => this.props.download(this.props.pair[1][0], "processed_" + fileName+".jpeg")}>.jpg/jpeg file</DropdownItem>
                        <DropdownItem
                            // onClick={() => this.props.download(this.props.pair[1][1], "processed_" + fileName + ".png")}
                            >.png file</DropdownItem>
                        <DropdownItem
                            // onClick={() => this.props.download(this.props.pair[1][2], "processed_" + fileName + ".tiff")}
                            >.tiff file</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}


export default EachDropDownButton;