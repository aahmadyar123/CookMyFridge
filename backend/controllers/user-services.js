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
  Registers user to database
  :param user: JSON containing user account information
  :return: JSON representing user added to DB
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

async function addRecipe(userID, recipeID) {
  /*
  Adds recipe reference to user
  :param userID: id of user
  :param recipeID: recipe id
  :return: boolean if added successfully
  */
  try {
    // console.log("user: ", user);

    const user = await findUserById(userID);

    if (user.recipes.includes(recipeID)) {
      return true;
    }
    else {
      user.recipes.push(recipeID);
      await user.save();
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeRecipe(userID, recipeID) {
  /*
  Removes recipe reference from user
  :param userID: id of user
  :param recipeID: recipe id
  :return: boolean if removed successfully
  */
 try {
  //remove recipe reference from user.recipes
  const user = await findUserByID(userID);

  //check if recipe not favorited
  const idx = user.recipes.indexOf(recipeID);
  if (idx === -1) {
    return false;
  }
  //remove recipe if favorited
  else {
    user.recipes.splice(idx, 1);
    await user.save();
    return true;
  }
 }
 catch (error) {
  console.log(error);
  return false;
 }


}

async function getRecipes(userID) {
  /*
  This function populates a user's list of recipes
  :param: userID: id of user to get recipes from
  :return: array of recipes
  */
  try {
    //find user and populate recipes from doucment references
    let user = await findUserById(userID);
    let populatedUser = await userModel.populate(user, "recipes");
    return populatedUser.recipes;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addIngredient(user, ingredientId) {
  /*
  Adds an ingredient to a user's list of ingredients
  
  :param ingredientId: id of ingredient to add
  :param user: user to add ingredient to
  :return: boolean - true if added, false otherwise
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

async function getIngredients(id) {
  /*
  Gets all ingredients associated with specified user
  :param id: id of user generated by MongoDB
  :return: list of ingredients associated with user
  */
  try {
    // populate without using utility functions
    const ingredients = await userModel.findById(id).select("ingredients");
    console.log("GET INGREDIENTS: ", ingredients);
    return ingredients;
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
      { _id: id },
      { $set: { ingredients: userIngredients.ingredients } }
    );

    r = await userModel.findById(id);
    return result;
  } catch (error) {
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
  updateIngredients,
  removeRecipe,
};
