import React from 'react';
import {
    Navbar,
    NavbarBrand}from 'reactstrap';

import NavItemB from './NavItem';
import './NavBarWrapper.css';

const NavBar = (props) => (
    <div>
        <Navbar color="light" light>
            <NavbarBrand>Medical Image Processor</NavbarBrand>
            <NavItemB link="/">Home</NavItemB>
            <NavItemB link="/results">Output</NavItemB>
        </Navbar>
        {props.children}
    </div>
);


export default NavBar;