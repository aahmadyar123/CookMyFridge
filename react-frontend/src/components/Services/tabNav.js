import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../css/services.css'

const Tnav = styled.nav`
    background: #FFFFFF;
    height: 80px;
    display: flex;
    z-index: 10;
`;

const NavLink = styled(Link)`
    color: #000;
    display: flex;
    justify-content: space-around;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    padding: 30px 0 30px 0;
    
    &.active {
        font-weight: bold;
        text-decoration: underline;
        text-decoration-color: #FF0000;
    }

    &:hover {
        font-weight: bold;
        text-decoration: underline;
    }
`;

const NavMenu = styled.div`
    display: flex;
    justify-content: flex-start;
    position: relative;
    margin-right: 100px;
    margin-left: 100px;
    width: 100%;
    right: 30px;
    margin-bottom: 10px;
    border-bottom: solid 1.4px;
`;

const TabNav = () => {
  return (
    <>
      <Tnav>
        <NavMenu>
          <NavLink id="Saved_Recipe" to='/services/saved_recipes' >
            Saved Recipes
          </NavLink>
          <NavLink id="Ingredients" to='/services/ingredients' >
            Ingredients
          </NavLink>
          <NavLink id="Recipe" to='/services/recipes' >
            Recipes
          </NavLink>
        </NavMenu>
      </Tnav>
    </>
  );
};

export default TabNav;
