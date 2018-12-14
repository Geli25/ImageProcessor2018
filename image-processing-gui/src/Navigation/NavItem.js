import React from 'react';
import {NavLink} from 'react-router-dom';

const NavItem = (props) => (
        <NavLink
            disabled={true}
            exact={props.exact}
            to={props.link}>{props.children}</NavLink>
);

export default NavItem;