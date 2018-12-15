import React from 'react';
import {NavLink} from 'react-router-dom';

const NavItem = (props) => (
        <NavLink
            exact={props.exact}
            to={props.link}>{props.children}</NavLink>
);

export default NavItem;