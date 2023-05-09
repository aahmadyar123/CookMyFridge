import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #FFFFFF;
    height: 108px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    border-bottom: solid 1px;
    border-color: #000;
`;

export const NavLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
      font-weight: bold;
      text-decoration: underline;
      // text-decoration-color: #EA7C69;
      text-decoration-color: #FF0000;
    }

    &:hover {
      font-weight: bold;
      text-decoration: underline;
      color: #000;
    }
    
`;

export const NavMenu = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    margin-right: 10px;
    right: 30px;
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: -44px;
`;
  
export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #000;
    padding: 10px 22px;
    color: #fff;
    border-radius: 100px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #929292;
      color: #fff;
    }
`;
