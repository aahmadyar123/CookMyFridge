import React from 'react'
import { createContext, useContext, useState } from "react";

const IngredientContext = createContext({});

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

	const add_ingredient = (ingredient) => {
		if (check(ingredient.slice(-1)[0]) === false) {
				setIngredients(ingredient);
		}
  }

	const delete_ingredient = (ingredient) => {
		setIngredients(ingredient);
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
		console.log("IN CONTEXT: ", ingredients);
	}

  const value = {
    ingredients,
		onAdd: add_ingredient,
		onDel: delete_ingredient,
		print: log
  };

  return (
    <IngredientContext.Provider value={{value}}>
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredients = () => useContext(IngredientContext);