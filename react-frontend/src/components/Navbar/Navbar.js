import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

import Searchbar from './Searchbar';
import '../../css/Nav.css'

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logo.png')} id='logo' alt="logo" />
        </NavLink>

        <NavMenu>
          <NavLink id="link" to='/' >
            Home
          </NavLink>
          <NavLink id="link" to='/About' >
            About
          </NavLink>
          <NavLink id="link" to='/SaveRecipe' >
            Services
          </NavLink>
          <NavLink id="link" to='/ContactUs' >
            Contact Us
          </NavLink>
        </NavMenu>

        <Searchbar id="Search"/>

        <NavBtn>
          <NavBtnLink to='/Login' id="register" > Login </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
