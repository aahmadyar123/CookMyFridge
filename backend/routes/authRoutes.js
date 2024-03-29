const express = require("express");
const router = express.Router();

//DB models
const userServices = require("../controllers/user-services");

//JWT module
const jwt = require("jsonwebtoken");

//env for JWT token secret
const dotenv = require("dotenv");
dotenv.config();

function generateAccessToken(id) {
  /*
  Generates JWT
  :param id: user DB ._id
  :return: JWT token
  */
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

// --------------------------------------------------
// AUTHENTICATION ENDPOINTS
// --------------------------------------------------
// login endpoint:
//    get username and password from request body and pass to
//    userServices.login() which authenticates the user from
//    the database
router.post("/login", async (req, res) => {
  const user = req.body;
  try {
    const result = await userServices.login(user.email, user.password);
    console.log(result);

    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      const token = generateAccessToken({ id: result._id });
      res.status(201).json({ token: token });
      //res.send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// register endpoint:
//  get username and password from request body and pass to
//  userServices.register() which adds the user to the database
//  after using bcrypt to hash the password
router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const result = await userServices.register(user.email, user.password);

    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      const token = generateAccessToken({ id: result._id });
      res.json({ token: token }).status(201);
      //res.send({ users_list: result});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/login", async (req, res) => {
  res.send("<h1>test<h1>");
});

module.exports = router;
