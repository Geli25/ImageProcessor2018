import React, { Component, } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class EachDropDownButton extends Component {
    state = {
        open: false
    }

    toggle = () => {
        this.setState(prevState => {
            return {
                open: !prevState.open
            }
        })
    }

    render() {
        return (
            <div>
                <ButtonDropdown isOpen={this.state.open} toggle={this.toggle}>
                    <DropdownToggle caret size="lg" color="info">
                        Download all as...
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>.zip file containing:</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={()=>this.props.dlall("jpeg")}>.jpeg files</DropdownItem>
                        <DropdownItem onClick={()=>this.props.dlall("png")}>.png files</DropdownItem>
                        <DropdownItem onClick={()=>this.props.dlall("tiff")}>.tiff files</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}


export default EachDropDownButton;