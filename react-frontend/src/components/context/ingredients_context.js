import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const IngredientContext = createContext({});

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [KCal, setKCal] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [sendRecipe, setRecipe] = useState(false);
  const [tolerances, setTolerance] = useState([]);

  useEffect( (sendRecipe) => {
    if (sendRecipe === true) {
      //axois post to send request for a recipe
      setRecipe(false); 
    }
  }, []);

  const add_tolerance = (tolerance) => {
    setTolerance(tolerance);
  }

  const send_recipe = (send) => {
    setRecipe(true);
  }

  const add_ingredient = async (ingredient, token) => {
	  if (check(ingredient.slice(-1)[0]) === false) {
        const new_ingredient = {'ingredients': ingredient}
        const tok = {headers: {'token': token}}
        console.log("SENT INGREDIENTS: ", new_ingredient);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, new_ingredient, tok);
        console.log("GOT BACK RESPONSE");

        if (response.status === 201) {
          setIngredients(ingredient);
        }
		}
  }

  const get_ingredients = async (token) => {
    console.log("SENDING TOKEN: ", {headers: {'token': token}});
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, {headers:{'token': token}});
    
    if (response.status === 201) {
      const new_ingredients = response.data.ingredients_list.ingredients
      console.log("INGREDIENTS FROM BACKEND: ", new_ingredients);
      setIngredients(new_ingredients);
    }
  }

	const delete_ingredient = async (ingredient, token) => {
    const new_ingredient = {'ingredients': ingredient }
    const tok = {headers: {'token': token}}
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, new_ingredient, tok);
    if (response.status === 201) {
      setIngredients(ingredient);
    }
	}

  const add_KCal = (kcal) => {
    setKCal(kcal);
  }

  const add_CookTime = (cookTime) => {
    setCookTime(cookTime);
  }

	function check(x) {
	  for(let y of ingredients) {
			if (x.toLowerCase() === y.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	const log = () => {
		console.log("IN CONTEXT INGREDIENTs: ", ingredients);
    console.log("IN CONTEXT KCAL", KCal);
    console.log("IN CONTEXT COOKTIME", cookTime);
    console.log("SEND RECIPE: ", sendRecipe);
	}

  const value = {
    ingredients,
    KCal,
    cookTime,
    tolerances,
		onAdd: add_ingredient,
		onDel: delete_ingredient,
    addKcal: add_KCal,
    addCookTime: add_CookTime,
    addTolerance: add_tolerance,
    recipe: send_recipe,
    getIngredients: get_ingredients,
		print: log
  };

  return (
    <IngredientContext.Provider value={{value}}>
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredients = () => useContext(IngredientContext);