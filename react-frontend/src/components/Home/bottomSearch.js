import React, { useState } from 'react'
import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai'
import "../../css/bottomSearch.css"
import {Box, TextField, MenuItem} from '@mui/material';
import { ingredientData } from './data';
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"; 

const Card = ({ingredientInfo}) => {
    return (
        <div>
            <h2>{ingredientInfo.name}</h2>
        </div>
    );
};

export const SearchNav = styled.nav`
  background: #FFFFFF;
  height: 108px;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const SearchContainer = styled.div`
    position: relative;
    width: 360px;
    height: 52px;
    top: 25.06px;
    background: #F2F4F8;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    translate: all 0.3s ease;
`;

const SearchInput = styled.input`
    padding-left: 48px;
    border: none;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;
    &:focus {
        border-color: rgba(0, 0, 0, 0.3)
    }
`;

const IconButton = styled.button`
    top: 3px;
    position: relative;
    height: 36px;
    width: 36px;
    border: none;
    z-index: 1;
    cursor: pointer;
    background: none;

    &:hover {
        color: grey;
        &::after {
            opacity: 1;
            transform: scale(1);
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 50%;
        z-index: -1;
        background-origin: #000;
        transition: 0.2s ease;
        transform: scale(0.6);  
    }


`;

export const ButtonBox = styled.nav`
  display: flex;
  align-items: center;
  margin-right: -44px;
`;

export const Button = styled.button`
  position: relative;
  width: 90px;
  height: 55px;
  right: 185px;
  top: 5px;
  border-radius: 8px;
  background: #000;
  color: #fff;
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

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Set a higher z-index value */
`;

const DropdownListItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 50px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export function Select() {
    //const [Category, setCategory] = useState('');
    // ALL CATEGORIES SEARCH, need to figure out what to do with?
    return (
        <Box width='200px' position="relative" top="22.5px" height="42px" right="90px">
            <TextField id="Select" label="All Categories" select fullWidth>
                <MenuItem value='region'> Asian </MenuItem>
                <MenuItem value='region'> Mexican </MenuItem>
                <MenuItem value='region'> American </MenuItem>
                <MenuItem value='region'> Mediterranean </MenuItem>
            </TextField>
        </Box>
    );
}

export default function BottomSearchbar() {
    const [isActive, setIsActive] = useState(false);
    const [tempData, setTempData] = useState(ingredientData);

    const _toggleSearch = () => {
        setIsActive(!isActive);
    }

    const onSearchChange = (value) =>{
        const newData = ingredientData.filter((ing) => 
            ing.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            );
        setTempData(newData);
    }

    return (
        <>
            <SearchNav>
                <SearchContainer isSearching={isActive}>
                    {/* search bar */}
                    <IconButton onClick={_toggleSearch}>   
                            <AiOutlineSearch size={25}/> 
                    </IconButton>

                    <SearchInput
                    type = "search" 
                    placeholder="Food Ingredients" size="100px"
                    onChange={(e) => onSearchChange(e.target.value)}
                    />

                    {tempData.map((ingredient, index) => (
                        <Card ingredientInfo = {ingredient} key={index}/> ))}
                    
                    
                </SearchContainer>


                <Select id="Select"/>
                <ButtonBox>
                    <Button onClick={handleConsoleLog} > Search </Button>
                </ButtonBox>
            </SearchNav>
        </>
    );
}