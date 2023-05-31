import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import "../css/bottomSearch.css";
import { Box, TextField, MenuItem } from "@mui/material";
import backgroundImage from "../images/pastaBread.jpg";
import axios from "axios";

export const SearchNav = styled.nav`
  background: #ffffff;
  height: 108px;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
`;

const SearchContainer = styled.div`
  width: 360px;
  height: 52px;
  background: #f2f4f8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
  padding-left: 10px;
  border: none;
  border-radius: 10px;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  border: 1px solid transparent;
  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
  }
`;

export const IconButton = styled.button`
  top: 3px;
  position: relative;
  height: 36px;
  width: 30px;
  border: none;
  z-index: 1;
  cursor: pointer;
  background: none;
`;

export const ButtonBox = styled.nav`
  //display: flex;
  align-items: center;
  margin-right: 44px;
`;

export const Button = styled.button`
  position: relative;
  width: 90px;
  height: 55px;
  right: 185px;
  margin-left: 50px;
  margin-right: 50px;
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

export const DropdownList = styled.ul`
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

export const DropdownListItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 50px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

function Select() {
  //const [Category, setCategory] = useState('');
  return (
    <Box
      width="200px"
      position="relative"
      top="22.5px"
      height="42px"
      right="90px"
    >
      <TextField id="Select" label="All Categories" select fullWidth>
        <MenuItem value="Region"> Asian </MenuItem>
        <MenuItem value="Region"> Middle Eastern </MenuItem>
        <MenuItem value="Region"> Latin </MenuItem>
        <MenuItem value="Region"> American </MenuItem>
      </TextField>
    </Box>
  );
}

const IngredientSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowDropdown(true);
  };

  const handleAddIngredient = () => {
    if (searchQuery.trim() !== "") {
      setIngredientList((prevIngredientList) => [
        ...prevIngredientList,
        searchQuery,
      ]);
      setSearchQuery("");
      setShowDropdown(true);
    }
  };

  const handleDropdownItemClick = (ingredient) => {
    setSearchQuery(ingredient);
    setShowDropdown(false);
  };

  const onSubmit = async () => {
    try {
      const requestData = { ingredients: ingredientList, token: "" };
      console.log(requestData);
      const response = await axios.post(
        "http://localhost:8000/ingredients",
        requestData
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <Container>
      <SearchNav>
        <SearchContainer>
          <IconButton>
            <AiOutlineSearch size={25} />
          </IconButton>
          <SearchInput
            placeholder="Food Ingredients"
            //size="100px"
            value={searchQuery}
            onChange={handleSearchInputChange}
            list="ingredientsList"
          />
          {showDropdown && searchQuery && (
            <DropdownList>
              {ingredientList.map((ingredient, index) => (
                <DropdownListItem
                  key={index}
                  onClick={() => handleDropdownItemClick(ingredient)}
                >
                  {ingredient}
                </DropdownListItem>
              ))}
            </DropdownList>
          )}
        </SearchContainer>

        <Button onClick={handleAddIngredient}>Add Ingredient</Button>

        <Select id="Select" />

        <ButtonBox>
          <Button onClick={onSubmit}> Search </Button>
        </ButtonBox>
      </SearchNav>
    </Container>
  );
};

export default IngredientSearch;
