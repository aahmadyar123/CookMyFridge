const recipeModel = require("../models/recipe");

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
async function getRecipeByID(id) {
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

async function getRatings(recipeID) {
  /*
  Returns ratings associated with recipe
  :param recipeID: databse id of recipe
  :return: recipe object
  */
  try {
    const recipe = await getRecipeByID(recipeID);
    return recipe;
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
  :return: recipe object
  */
  try {
    //find recipe then update average rating and push new rating
    const recipe = await getRecipeByID(recipeID);

    if (!rating.score) rating.score = 0;

    //check if score updated successfully
    if (updateAverageRating(recipe, rating.score)) {
      recipe.ratings.push(rating);
      await recipe.save(); //save updated recipe to DB
      return recipe;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
// async function findRecipeByName(name) {
//   return await recipeModel.find({ name: name });
// }

// This function is only used inside this file (it's a helper function)
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

// --------------------------------------------------
// EXPORTS
// --------------------------------------------------
module.exports = {
  // getRecipes,
  addRecipe,
  getRecipeByID,
  // updateAverageRating,
  getRecipeByWebID,
  getRatings,
  addRating,
};
