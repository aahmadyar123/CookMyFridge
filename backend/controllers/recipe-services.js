const mongoose = require("mongoose");
const recipeModel = require("../models/recipe");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("debug", process.env.DEBUG);

mongoose
  .connect(
    // mongodb+srv://testerusery213:<password>@cookmyfridgedb.g0itp3r.mongodb.net/
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority&authSource=" +
      process.env.MONGO_AUTH_DB,
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

// get Recipes by name
// if name is undefined, return all recipes
// else return recipes with matching name
async function getRecipes(name) {
  let result;
  if (name === undefined) {
    result = await recipeModel.find();
  } else if (name) {
    result = await findDocByName(recipeModel, name);
    // result = await findRecipeByName(name);
  }
  return result;
}

// create a new recipe
async function addRecipe(recipe) {
  try {
    const newRecipe = new recipeModel(recipe);
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getRecipeByWebID(id) {
  /*
  Find recipe from spoonacular id (used to check DB if recipe already added as to not add duplicates)
  :param id: spoonacular id for recipe
  :return: JSON object representing recipe
  */
  try {
    const result = await recipeModel.findOne({ id: id });
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// find a recipe by ID
async function getRecipeById(id) {
  /*
  Finds recipe by databse id
  :param id: id for entry in DB
  */
  try {
    return await recipeModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function updateAverageRating(recipe, rating) {
  /*
  Updates average rating of a recipe
  :param recipe: recipeModel object
  :param: rating: integer represnting rating
  :return: boolean specifying if rating successfully updated
  */
  try {
    //check for valid rating
    if (rating < 0 || rating > 5) {
      return false;
    }
    //get current rating and total number of ratings
    let curRating = recipe.rating;
    let numRatings = recipe.ratings.length;

    //average previous rating and new rating and weight them based on how many previous ratings
    recipe.rating =
      curRating * (numRatings / (numRatings + 1)) +
      rating * (1 / (numRatings + 1));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getRatings(recipeID) {
  /*
  Returns ratings associated with recipe
  :param recipeID: databse id of recipe
  :return: list(JSON) - ratings for a recipe
  */
  try {
    const recipe = findByID(recipeID);
    return recipe.ratings;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addRating(recipeID, rating) {
  /*
  Adds rating to recipe
  :param recipeID: recipe database id
  :param rating: JSON containing recipe review
  :return: boolean specifying if rating added
  */
  try {
    //find recipe then update average rating and push new rating
    const recipe = findByID(recipeID);

    //check if recipe has ratings/rating field
    if (!recipe.hasOwnProperty("ratings")) recipe.ratings = [];
    if (!recipe.hasOwnProperty("rating")) recipe.rating = 0;

    //check if score updated successfully
    if (updateAverageRating(recipe, rating.score)) {
      recipe.ratings.push(rating);
      await recipe.save(); //save updated recipe to DB
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
async function findRecipeByName(name) {
  return await recipeModel.find({ name: name });
}

// --------------------------------------------------
// EXPORTS
// --------------------------------------------------
module.exports = {
  getRecipes,
  addRecipe,
  getRecipeById,
  updateAverageRating,
  getRecipeByWebID,
  getRatings,
  addRating,
};
