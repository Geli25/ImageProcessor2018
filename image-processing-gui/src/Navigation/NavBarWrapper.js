import React from 'react';
import NavItem from './NavItem';
import './NavBarWrapper.css'

const NavBar = (props) => (
    <div>
        <ul>
            <NavItem link="/">Input</NavItem>
        </ul>
        {props.children}
    </div>
);

export default NavBar;