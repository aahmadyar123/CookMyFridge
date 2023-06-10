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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipe_id}/ratings`, tok);
      setRatings(response.data.ratings);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  }

  const get_recipeById = async (recipe_id, token) => {
    try {
      const tok = {headers: {'token': token}};
      console.log("ID: ", recipe_id);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipe_id}`, tok);
      console.log("RECIPE GET: ", response.data);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  }

  const send_rating = async (recipe_id, rating, token) => {
    const tok = {headers: {'token': token}}
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipe_id}/ratings`, {'rating':rating}, tok);
      setRatings(response.data['ratings']);
    } catch (error) {
      console.log(error);
    }
  }

  const send_recipe = async (recipe, token) => {
    const tok = {headers: {'token': token}};
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipes`, recipe, tok);
      const r = response.data['recipes_list'];
      let favorites = []
      if (response.data['favorites'] === undefined) {
        favorites = [];
      } else {
        favorites = response.data['favorites'];
      }

      for (let fav of favorites) {
        fav['favorite'] = true;
      }

      setFavoriteList(favorites);
      const favorite_ids = favorites.map(fav => fav.id);
      
      for (let recipe of r) {
        if (favorite_ids.includes(recipe.id)) {
          recipe['favorite'] = true;
        } else {
          recipe['favorite'] = false;
        }
      }
      setRecipe(response.data['recipes_list']);
      navigate('/services/recipes');
    } catch (error) {
      console.log(error);
    }
    
  }

  const favorite_recipe = async (id, token) => {
    const tok = {headers: {'token': token}};
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {'id': id}, tok);
      if (response.status === 201) {
        console.log("FAVORITED RECIPE");
      } else {
        console.log("FAILED FAVORITE");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const unfavorite_recipe = async (id, token) => {
    const tok = {headers: {'token': token}};
    try {
      console.log("Unfavorite token: ", token);
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, tok);
      if (response.status === 201) {
        console.log("UNFAVORITED RECIPE");
      } else {
        console.log("FAILED UNFAVORITE");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const add_favorite = (recipe) => {
    setFavoriteList((favorite_list) => [...favorite_list, recipe]);
  }

  const delete_favorite = (recipe_id) => {
    const new_favs = favorite_list.filter((fav) => fav.id !== recipe_id);
    setFavoriteList(new_favs);
  }


  const get_recipe = async (token) => {
    try {
      const tok = {headers: {'token': token}}
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`, tok);
      for (let fav of response.data) {
        fav['favorite'] = true;
      }

      setFavoriteList(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const add_ingredient = async (ingredient, token) => {
	  if (check(ingredient.slice(-1)[0]) === false) {
        const new_ingredient = {'ingredients': ingredient}
        const tok = {headers: {'token': token}}
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, new_ingredient, tok);

        if (response.status === 201) {
          setIngredients(ingredient);
        }
		}
  }

  const get_ingredients = async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ingredients`, {headers:{'token': token}});
    
    if (response.status === 201) {
      const new_ingredients = response.data.ingredients_list.ingredients
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
    getRecipeId: get_recipeById,
    addFavorite: add_favorite,
    delFavorite: delete_favorite,
    favoriteRecipe: favorite_recipe,
    unfavoriteRecipe: unfavorite_recipe,
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
