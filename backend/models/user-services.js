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
    user that is added or false if not added
  */

  try {
    //create new user model and add to database
    user.password = await bcrypt.hash(password, 10);

    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser
  }
  catch (error) {
    console.log(error);
    return false;
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
  const user = await userModel.findOne({username: login.username})

  //invalid username (user does not exist)
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


exports.register = register;
exports.login = login;
exports.findUserById = findUserById;


