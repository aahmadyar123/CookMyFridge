const mongoose = require("mongoose");
const recipeModel = require("./recipe");
const dotenv = require("dotenv");

// utility functions
const { findDocByName, findDocByField, populateField, createDoc } = require("../utility/utility");

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
      "?retryWrites=true&w=majority&authSource="+
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


// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
async function findRecipeByName(name) {
    return await recipeModel.find({name: name});
}


// --------------------------------------------------
// EXPORTS
// --------------------------------------------------
module.exports = {
    getRecipes,
    createRecipe,
};