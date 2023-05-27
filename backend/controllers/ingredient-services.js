const mongoose = require("mongoose");
const ingredientModel = require("../models/ingredient");
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


// get Ingredients by name or type or both (type can be NULL)
async function getIngredients(name) {
    let result;
    if (name === undefined) {
        result = await ingredientModel.find();
    } else if (name) {
        result = await findIngredientByName(name);
    }
    return result;
}

// get an ingredient by id
async function getIngredientById(id) {
    try {
        return await ingredientModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// add an ingredient
async function createIngredient(ingredient) {
    try {
        const ingredientToAdd = new ingredientModel(ingredient);
        const savedIngredient = await ingredientToAdd.save();
        return savedIngredient;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// remove an ingredient (boolean  return)
// - use findByIdAndRemove(id) to remove an ingredient
async function deleteIngredientById(id) {
    try {
        await ingredientModel.findByIdAndRemove(id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// remove an ingredient by name (boolean  return)
async function deleteIngredientByName(name) {
    try {
        await ingredientModel.findOneAndRemove({name: name});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// get ingredient by user id
async function getIngredientByUserId(userId) {
    try {
        return await ingredientModel.findOne({userId: userId});
    } catch (error) {
        console.log(error);
        return undefined;
    }
}



// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
async function findIngredientByName(name) {
    return await ingredientModel.find({name: name});
}


// --------------------------------------------------
// EXPORTS
// --------------------------------------------------
module.exports = {
    getIngredients,
    getIngredientById,
    createIngredient,
    deleteIngredientById,
    deleteIngredientByName,
    getIngredientByUserId
};