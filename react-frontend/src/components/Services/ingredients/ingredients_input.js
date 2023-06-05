import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import "../../../css/bottomSearch.css"
import { AiOutlineSearch } from "react-icons/ai";
import {useIngredients} from '../../context/ingredients_context';
import TextField from '@material-ui/core/TextField';
import ToleranceSelectCheckmarks from './ingredients_tolerance';
import { ingredientData } from "../../Home/data";
import { useAuth } from '../../context/AuthProvider';

export const SearchNav = styled.nav`
  background: #FFFFFF;
  height: 108px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const SearchContainer = styled.div`
    position: relative;
    width: 360px;
    height: 52px;
    right: 190px;
    background: #F2F4F8;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    translate: all 0.3s ease;
`;

export const SearchInput = styled.input`
    padding-left: 10px;
    border: none;
    border-radius: 10px;
    position: relative;
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

export const IconButton = styled.button`
    top: 10px;
    padding-left: 5px;
    position: relative;
    height: 36px;
    width: 36px;
    border: none;
    z-index: 1;
    cursor: pointer;
    background: none;
`;

export const ButtonBox = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: -150px;
`;

export const Button = styled.button`
  position: relative;
  width: 90px;
  height: 55px;
  right: 220px;
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

export default function IngredientAdd() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ingredientList, setIngredientList] = useState([]);
    const [kcal, setKcal] = useState("");
    const [cookTime, setCookTime] = useState("");

    // might need dropdown for later but for now, don't need
    // const [showDropdown, setShowDropdown] = useState(false);
    const [tempData, setTempData] = useState(ingredientData); 

    const {Auth} = useAuth();
    const {value} = useIngredients();

    useEffect(() => {
      setIngredientList(value.ingredients);
    }, [value.ingredients]);


    const handleKcalChange = (event) => {
      console.log("KCAL: ", event.target.value);
      setKcal(event.target.value);
    }

    const handleCookTimeChange = (event) => {
      console.log("COOKTIME: ", event.target.value);
      setCookTime(event.target.value);
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        // setShowDropdown(true);
        console.log(event.target.value);
        onSearchChange(event.target.value);
    };

    const onSearchChange = (value) =>{
      const newData = ingredientData.filter((ing) => 
          ing.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          );
      setTempData(newData);
      console.log(tempData);
    };

    const handleAddIngredient = async () => {
      if (searchQuery.trim() !== '') {
        setIngredientList((ingredientList) => [...ingredientList, searchQuery]);
        console.log("TOKEN: ", Auth.token);
        await value.onAdd([...ingredientList, searchQuery], Auth.token);
        setSearchQuery('');
        // setShowDropdown(false);
      }
    };

    const handleDropdownItemClick = (ingredient) => {
      setSearchQuery(ingredient);
      // setShowDropdown(false);
    };    

    const handleRecipeSearch = () => {
      const recipe = {'includeIngredients': ingredientList, 'maxCal': kcal, 'maxReadyTime': cookTime, 'intolerances': value.tolerances};
      value.addKcal(kcal);
      value.addCookTime(cookTime);
      value.recipe(recipe, Auth.token);
    };

    const get_recipe = () => {
      value.getRecipes(Auth.token);
    }

    return (
            <SearchNav>
                <SearchContainer>
                    <IconButton > 
                            <AiOutlineSearch size={27}/>
                    </IconButton>
                    <SearchInput 
                        placeholder="       Food Ingredients" 
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        list="ingredientsList"
                    />
                    {searchQuery && (
                        <DropdownList>
                        {tempData.map((ingredient, index) => (
                            <DropdownListItem key={index} onClick={() => handleDropdownItemClick(ingredient.name)}>
                            {ingredient.name}
                            </DropdownListItem>
                        ))}
                        </DropdownList>
                    )}

                </SearchContainer>
                
                <ButtonBox>
                  <Button onClick={handleAddIngredient}>Add</Button>
                </ButtonBox>

                <div className="SelectContainer">
                  <ToleranceSelectCheckmarks className="Select" />
                </div>

                <TextField
                    className="kcal"
                    helperText={"Max Calories"}
                    type="number"
                    label="Kcal" 
                    name="Kcal" 
                    variant="outlined" 
                    defaultValue={null}
                    onChange={handleKcalChange}
                />

                <TextField 
                    className="minutes"
                    helperText={"Max time in min"}
                    type="number"
                    label="minutes" 
                    name="minutes" 
                    variant="outlined" 
                    defaultValue={null}
                    onChange={handleCookTimeChange}
                />
                
                <ButtonBox className="SButton">
                    <Button onClick={handleRecipeSearch}> Search </Button>
                </ButtonBox>

            </SearchNav>
    );
}