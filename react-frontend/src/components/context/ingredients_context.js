import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";

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

  const add_ingredient = (ingredient) => {
	if (check(ingredient.slice(-1)[0]) === false) {
				setIngredients(ingredient);

		}
  }

	const delete_ingredient = (ingredient) => {
		setIngredients(ingredient);
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
		print: log
  };

  return (
    <IngredientContext.Provider value={{value}} context={{value}}>
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredients = () => useContext(IngredientContext);