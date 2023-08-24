const express = require("express");
const router = express.Router();




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

