const mongoose = require("mongoose");
const recipeModel = require("../models/recipe");
const dotenv = require("dotenv");

// utility functions
const {
  findDocByName,
  findDocByField,
  populateField,
  createDoc,
} = require("../utility/utility");

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
async function createRecipe(recipe) {
  const savedRecipe = await createDoc(recipeModel, recipe);
  if (savedRecipe) {
    return savedRecipe;
  } else {
    return false;
  }
}


async function getRecipeByWebID(id) {
  /*
  Find recipe from spoonacular id
  :param id: spoonacular id for recipe
  :return:  JSON object representing recipe
  */
  try {
    const result = await recipeModel.findOne({id : id});
    return result;

  }
  catch (error) {
    console.log(error)
    return undefined
  }


}


// find a recipe by ID
async function getRecipeById(id) {
  /*
  This functions finds user by id
  Args:
    id: id for entry in DB
  */
  try {
    return await recipeModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// update recipe rating
// - this function updates the recipe rating by taking the average of the current rating and the new rating
// - this function also increments the number of ratings by 1
async function updateRecipeRating(recipeId, rating) {
  const recipe = await getRecipeById(recipeId);
  if (recipe) {
    recipe.rating = recipe.rating || 0;
    recipe.no_ratings = recipe.no_ratings || 0;

    if (rating < 0 || rating > 5) {
      console.log("Invalid rating");
      return false;
    }

    const newRating =
      (recipe.rating * recipe.no_ratings + rating) / (recipe.no_ratings + 1);
    recipe.rating = newRating;
    recipe.no_ratings += 1;
    await recipe.save();
    return recipe;
  } else {
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
  createRecipe,
  getRecipeById,
  updateRecipeRating,
};
