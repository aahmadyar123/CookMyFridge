import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

import { useAuth } from "../context/AuthProvider";
import Searchbar from './Searchbar';
import '../../css/Nav.css'

const Navbar = () => {
  const { value } = useAuth();

  let button;

  value.token ? (
    button =  <NavBtnLink to='/' id="register" onClick={value.onLogout}> Sign Out </NavBtnLink>
  ) : (
    button = <NavBtnLink to='/Login' id="register"> Login </NavBtnLink>
  )

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
          <NavLink id="link" to='/services/recipes'>
            Services
          </NavLink>
          <NavLink id="link" to='/ContactUs' >
            Contact Us
          </NavLink>
        </NavMenu>

        <Searchbar id="Search"/>

         <NavBtn>
           {button}
        </NavBtn>

      </Nav>
    </>
  );
};

export default Navbar;
