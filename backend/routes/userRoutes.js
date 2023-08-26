//express router
const express = require("express");
const router = express.Router();

//DB models
const userServices = require("../controllers/user-services");
const { model } = require("mongoose");


// --------------------------------------------------
// USER ENDPOINTS
// --------------------------------------------------
// Get users endpoint:
router.get("/", async (req, res) => {
  const name = req.query["name"];
  try {
    const result = await userServices.getUsers(name);
    res.send({ users_list: result }); // can be empty array (no error if nothing found)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get User by Id endpoint:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userServices.findUserById(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});



// Populate the Recipes for a specific User
router.get("/:id/recipes", async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await userServices.findUserById(user_id);
    const result = await userServices.getRecipes(user);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});


// Add a Recipe to a User's Saved Recipes endpoint:
// - body of the request to this endpoint contains 1 field: recipe_id
router.post("/:id/recipes", async (req, res) => {
  const user_id = req.params.id;
  const user = await userServices.findUserById(user_id);
  const recipe_id = req.body.recipe_id;
  try {
    const result = await userServices.addRecipe(user, recipe_id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
