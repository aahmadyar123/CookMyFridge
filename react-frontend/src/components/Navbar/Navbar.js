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
          <NavLink id="link" to='/' activeStyle>
            Home
          </NavLink>
          <NavLink id="link" to='/About' activeStyle>
            About
          </NavLink>
          <NavLink id="link" to='/SaveRecipe' activeStyle>
            Services
          </NavLink>
          <NavLink id="link" to='/ContactUs' activeStyle>
            Contact Us
          </NavLink>
        </NavMenu>

        <Searchbar id="Search"/>

        <NavBtn>
          <NavBtnLink to='/Login' id="register" > Register </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
