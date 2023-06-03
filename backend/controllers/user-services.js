const mongoose = require("mongoose");
const userModel = require("../models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// utility functions
const {
  findDocs,
  findDocByField,
  populateField,
  createDoc,
} = require("../utility/utility");

dotenv.config();

mongoose.set("debug", process.env.DEBUG);

mongoose
  .connect(
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

console.log("Connected to MongoDB.");

async function register(user) {
  /*
  This functions adds user to database
  Args:
    user: user to add to db
  Return:
    JSON of user if created
  */

  try {
    //check if duplicate email
    duplicate = await userModel.findOne({ email: user.email });
    if (duplicate) {
      return undefined;
    }

    //create new user model and add to database
    user.password = await bcrypt.hash(user.password, 10);
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function login(login) {
  /*
  This function checks for valid login
  Args:
    login: JSON data representing user login information
  */
  try {
    //get user
    const user = await userModel.findOne({ email: login.email });

    //invalid email (user does not exist)
    if (!user) return undefined;

    //compare entered password to one retreieved from DB
    const validPwd = await bcrypt.compare(login.password, user.password);
    if (validPwd) return user;
    else return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getUsers(name) {
  let result = await findDocs(userModel, name);
  return result;
}

async function findUserById(id) {
  /*
  This functions finds user by id
  Args:
    id: id for entry in DB
  */
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function deleteUser(login) {
  /*
  This function deletes a user from the database
  Args:
    login(JSON): login information to confirm deletion of account
  Return:
    boolean: true if deleted, false otherwise
  */
  try {
    //get user
    const user = await userModel.findOne({ email: login.email });

    //invalid email (user does not exist)
    if (!user) return false;

    //compare entered password to one retreieved from DB
    const validPwd = await bcrypt.compare(login.password, user.password);
    if (validPwd) {
      return (await userModel.findByIdAndDelete(user.id)) !== null;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addRecipe(user, recipeId) {
  /*
  This function adds a recipe to a user's list of recipes
  Args:
    recipeId: id of recipe to add
    user: user to add recipe to
  Return:
    boolean: true if added, false otherwise
  */
  try {
    // console.log("user: ", user);

    user.recipes.push(recipeId);
    await user.save();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getRecipes(user) {
  /*
  This function populates a user's list of recipes
  Args:
    userId: id of user to get recipes from
  Return:
    array of recipes
  */
  try {
    // populate without using utility functions
    let populatedUser = await user.populate("recipes");

    // const recipes = await populateField(user, "recipes");
    return populatedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addIngredient(user, ingredientId) {
  /*
  This function adds an ingredient to a user's list of ingredients
  Args:
    ingredientId: id of ingredient to add
    user: user to add ingredient to
  Return:
    boolean: true if added, false otherwise
  */
  try {
    // console.log("user: ", user);

    user.ingredients.push(ingredientId);
    await user.save();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function getIngredients(user) {
  /*
  This function populates a user's list of ingredients
  Args:
    user: user to get recipes from
  Return:
    array of recipes
  */
  try {
    // populate without using utility functions
    let populatedUser = await user.populate("ingredients");

    // const recipes = await populateField(user, "recipes");
    return populatedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addFriend(user, friendId) {
  /*
  This function adds a friend to a user's list of friends
  Args:
    friendId: id of friend to add
    user: user to add friend to
  Return:
    boolean: true if added, false otherwise
  */
  try {
    // console.log("user: ", user);

    user.friends.push(friendId);
    await user.save();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function updateIngredients(id, userIngredients) {
  /*
  Updates user.ingredients field in database
  :param id: user id in database
  :param ingredients: updated list of ingredients for user
  */
  try {
    //update ingredients field for user with specified id
    const result = await userModel.updateOne(
      {_id: id},
      {$set: {ingredients: userIngredients.ingredients}}
    );

    r = await userModel.findById(id);
    console.log("RESULT: ", r);
    return result;
  }
  catch (error) {
    console.log(error);
    return undefined;
  }
}


async function getFriends(user) {
  /*
  This function populates a user's list of friends
  Args:
    user: user to get recipes from
  Return:
    array of recipes
  */
  try {
    // populate without using utility functions
    let populatedUser = await user.populate("friends");

    // const recipes = await populateField(user, "recipes");
    return populatedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getUserData(user) {
  /*
  This function populates a user's list of friends, recipes, and ingredients
  Args:
    user: user to get recipes from
  Return:
    user filled with friends, recipes, and ingredients
  */
  try {
    // populate
    let populatedUser = await user.populate("friends");
    populatedUser = await user.populate("recipes");
    populatedUser = await user.populate("ingredients");

    // const recipes = await populateField(user, "recipes");
    return populatedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

module.exports = {
  register,
  login,
  getUsers,
  findUserById,
  deleteUser,
  addRecipe,
  getRecipes,
  addIngredient,
  getIngredients,
  addFriend,
  getFriends,
  getUserData,
  updateIngredients
};
