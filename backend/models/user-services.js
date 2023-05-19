const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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
      "?retryWrites=true&w=majority&authSource="+
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
    duplicate = await userModel.findOne({email: user.email});
    if (duplicate)
      return undefined

    //create new user model and add to database
    user.password = await bcrypt.hash(user.password, 10);
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser
  }
  catch (error) {
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
  const user = await userModel.findOne({email: login.email})

  //invalid email (user does not exist)
  if (!user)
    return undefined

  //compare entered password to one retreieved from DB
  const validPwd = await bcrypt.compare(login.password, user.password);
  if (validPwd)
    return user
  else
    return undefined
  }
  catch (error) {
    console.log(error);
    return undefined;
  }
}


async function findUserById(id) {
  /*
  This functions finds user by id
  Args:
    id: id for entry in DB
  */
  try {
    return await userModel.findById(id);
  }
  catch (error) {
    console.log(error);
    return undefined
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
  const user = await userModel.findOne({email: login.email})

  //invalid email (user does not exist)
  if (!user)
    return false

  //compare entered password to one retreieved from DB
  const validPwd = await bcrypt.compare(login.password, user.password);
  if (validPwd) {
    return await userModel.findByIdAndDelete(user.id) !== null;
  }
  else
    return false
  }
  catch (error) {
    console.log(error);
    return false;
  }
}


module.exports = {
    register,
    login,
    findUserById,
    deleteUser
};


