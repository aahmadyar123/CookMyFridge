import React from 'react'
import { createContext, useContext, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IngredientContext = createContext({});

export const IngredientProvider = ({ children }) => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [KCal, setKCal] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [tolerances, setTolerance] = useState([]);
  const [recipes, setRecipe] = useState([]);
  const [favorite_list, setFavoriteList] = useState([]);
  const [ratings, setRatings] = useState([]);

  const add_tolerance = (tolerance) => {
    setTolerance(tolerance);
  }

  const get_ratings = async (recipe_id, token) => {
    try {
      const tok = {headers: {'token': token}}
      console.log("RECIPE_ID IN GET RATING: ", recipe_id);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/${recipe_id}/ratings`, tok);
      setRatings(response.data.ratings);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  }

  const send_rating = async (recipe_id, rating, token) => {
    const tok = {headers: {'token': token}}
    try {
      console.log("SENDING RATING: ", rating);
      console.log("FOR RECIPE: ", recipe_id);
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/recipe/${recipe_id}/ratings`, {'rating':rating}, tok);
      setRatings(response.data['ratings']);
    } catch (error) {
      console.log(error);
    }
  }

  const send_recipe = async (recipe, token) => {
    console.log("SENDING RECIPE: ", recipe);
    const tok = {headers: {'token': token}};
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipes`, recipe, tok);
      
      console.log("RESPONSE: ", response);
      console.log("DATA: ", response.data);
      console.log("FAVORITES: ", response.data['favorites'][0]);
      setFavoriteList(response.data['favorites']);
      
      const r = response.data['recipes_list'];
      const favorite_ids = response.data['favorites'].map(fav => fav.id);
      
      for (let recipe of r) {
        if (favorite_ids.includes(recipe.id)) {
          recipe['favorite'] = true;
        } else {
          recipe['favorite'] = false;
        }
      }

      console.log(response.data['recipes_list']);
      setRecipe(response.data['recipes_list']);
      navigate('/services/recipes');
    } catch (error) {
      console.log(error);
    }
    
  }

  const favorite_recipe = async (id, token) => {
    console.log("FAVORITING ID: ", id);
    console.log("In FAVORITE SENDING token: ", token);
    const tok = {headers: {'token': token}};
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/recipes/` + id, {'id': id}, tok);
      if (response.status === 201) {
        console.log("FAVORITED RECIPE");
      } else {
        console.log("FAILED FAVORITE");
      }
    } catch (error) {
      console.log(error);
    }

  }

  const get_recipe = async (token) => {
    try {
      const tok = {headers: {'token': token}}
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`, tok);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const add_ingredient = async (ingredient, token) => {
	  if (check(ingredient.slice(-1)[0]) === false) {
        const new_ingredient = {'ingredients': ingredient}
        const tok = {headers: {'token': token}}
        console.log("SENT INGREDIENTS: ", new_ingredient);
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, new_ingredient, tok);
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
      return new_ingredients;
    }
  }

	const delete_ingredient = async (ingredient, token) => {
    const new_ingredient = {'ingredients': ingredient }
    const tok = {headers: {'token': token}}
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, new_ingredient, tok);
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
	}

  const value = {
    ingredients,
    KCal,
    cookTime,
    tolerances,
    recipes,
    ratings,
    favorite_list,
		onAdd: add_ingredient,
		onDel: delete_ingredient,
    addKcal: add_KCal,
    addCookTime: add_CookTime,
    addTolerance: add_tolerance,
    recipe: send_recipe,
    favoriteRecipe: favorite_recipe,
    getRecipes: get_recipe,
    getIngredients: get_ingredients,
		print: log,
    getRatings: get_ratings,
    updateRatings: send_rating
  };

  return (
    <IngredientContext.Provider value={{value}}>
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredients = () => useContext(IngredientContext);