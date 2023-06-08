import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Title
} from './NavbarElements';

import { useAuth } from "../context/AuthProvider";
// import Searchbar from './Searchbar';
import '../../css/Nav.css'

const Navbar = () => {
  const { Auth } = useAuth();

  let button;
  
  Auth.token ? (
    button =  <NavBtnLink to='/' id="register" onClick={Auth.onLogout}> Sign Out </NavBtnLink>
  ) : (
    button = <NavBtnLink to='/Login' id="register"> Login </NavBtnLink>
  )

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logohome.png')} id='logo' alt="logo" border="2px"/>
        </NavLink>

        <NavMenu>
          <NavLink id="link" to='/' >
            <Title>Home</Title>
          </NavLink>
          <NavLink id="link" to='/About' >
            <Title>About</Title>
          </NavLink>
          <NavLink id="link" to='/services/recipes'>
            <Title>Services</Title>
          </NavLink>
          <NavLink id="link" to='/ContactUs' >
            <Title>Contact Us</Title>
          </NavLink>
        </NavMenu>

        {/* <Searchbar id="Search"/> */}

         <NavBtn>
           {button}
        </NavBtn>

      </Nav>
    </>
  );
};

export default Navbar;
