const express = require("express");
const router = express.Router();

// Spoonacular API methods
const recipeAPI = require("../recipeAPI.js");

//DB models
const userServices = require("../controllers/user-services");
const recipeServices = require("../controllers/recipe-services");

router.delete("/:id", async (req, res) => {
  try {
    const recipe_id = req.params.id;
    const user_id = req._id;
    const result = await userServices.removeRecipe(user_id, recipe_id);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(201).send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

//load in saved recipes
router.get("/", async (req, res) => {
  try {
    //send back recipes associated with user
    const id = req._id;
    const recipes = await userServices.getRecipes(id);
    if (recipes === undefined || recipes.length === 0) {
      res.status(404).send("Recipes not Found for User");
    } else {
      res.status(201).send(recipes).end();
    }
  } catch (error) {
    console.log(error);
    res.status(505).send("Recipes not Found for User");
  }
});

// Get recipe by Id endpoint:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await recipeServices.getRecipeByID(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

//search API for recipes
router.post("/", async (req, res) => {
  try {
    const id = req._id;
    parameters = req.body;
    recipes = await recipeAPI.getRecipes(parameters);

    if (recipes === undefined || recipes.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      //check if recipe already exists in DB
      for (let i = 0; i < recipes.length; i++) {
        let recipe = await recipeServices.getRecipeByWebID(recipes[i].id);
        if (recipe) {
          recipes[i] = recipe;
        } else {
          //add recipe to database
          recipes[i] = await recipeServices.addRecipe(recipes[i]);
        }
      }
      const favorites = await userServices.getRecipes(id);
      res.status(201).send({
        favorites: favorites,
        recipes_list: recipes,
      });
    }
  } catch (error) {
    console.log("ERROR IN RECIPE POST");
    console.log(error);
    res.status(500).send("BAD AUTH /services/recipes");
  }
});

//Favorite Recipe
router.patch("/:id", async (req, res) => {
  try {
    //data base id for user and recipe
    const userID = req._id;
    const recipeID = req.params["id"];
    const result = await userServices.addRecipe(userID, recipeID);
    if (!result) {
      res.status(500).end();
    } else {
      res.status(201).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get ratings for recipe
// - most of this functionality is handled in the frontend,
//   this endpoint sends a json object of a recipe
router.get("/:id/ratings", async (req, res) => {
  try {
    //get recipe ID
    const recipeID = req.params["id"];
    const ratings = await recipeServices.getRatings(recipeID);

    if (ratings === undefined) {
      res.status(404).send("Resource not Found").end();
    } else {
      res.status(201).send(ratings).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//add rating to recipe
router.patch("/:id/ratings", async (req, res) => {
  try {
    //get recipeID and new rating to add to recipe
    const recipeID = req.params["id"];
    const rating = req.body["rating"];

    //add rating to recipe
    const result = await recipeServices.addRating(recipeID, rating);

    if (!result) {
      res.status(404).end();
    } else {
      res.status(201).send(result).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
