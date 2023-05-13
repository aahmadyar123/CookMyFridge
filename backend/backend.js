const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Add mongdb user services
const userServices = require("./models/user-services");
const ingredientServices = require("./models/ingredient-services");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// --------------------------------------------------
// AUTHENTICATION ENDPOINTS
// --------------------------------------------------
// login endpoint:
//    get username and password from request body and pass to 
//    userServices.login() which authenticates the user from
//    the database
app.post("/login", async (req, res) => {
  const user = req.body;
  try {
    const result = await userServices.login(user);
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

// register endpoint:
//  get username and password from request body and pass to
//  userServices.register() which adds the user to the database
//  after using bcrypt to hash the password
app.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const result = await userServices.register(user);
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

// --------------------------------------------------
// USER ENDPOINTS
// --------------------------------------------------
// Get User by Id endpoint:
app.get("/users/:id", async (req, res) => {
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


// --------------------------------------------------
// RECIPE ENDPOINTS
// --------------------------------------------------
// Get all recipes endpoint:

// Get recipe by Id endpoint:

// Get recipes by user Id endpoint:

// Create recipe endpoint:

// Update recipe endpoint:

// Delete recipe endpoint:


// --------------------------------------------------
// INGREDIENT ENDPOINTS
// --------------------------------------------------
// Get all ingredients endpoint:
//  [X] get all ingredients from database filtering by name,
//      type
//  [ ] filter by recipeId (out of scope)
//  [ ] filter by userId (out of scope)
app.get("/ingredients", async (req, res) => {
  const name = req.query["name"];
  const type = req.query["type"];
  try {
    const result = await ingredientServices.getIngredients(name, type);
    res.send({ ingredients_list: result }); // can be empty array (no error if nothing found)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get ingredient by Id endpoint:
app.get("/ingredients/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ingredientServices.getIngredientById(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ ingredients_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get ingredients by recipe Id endpoint:

// Get ingredients by user Id endpoint:

// Create ingredient endpoint:
app.post("/ingredients", async (req, res) => {
  const ingredientToAdd = req.body;
  try {
    const savedIngredient = await ingredientServices.createIngredient(ingredientToAdd);
    if (savedIngredient) {
      res.status(201).send(savedIngredient).end();
    }
    else {
      res.status(400).send("Bad Request.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Update ingredient endpoint:

// Delete ingredient by id endpoint:
app.delete("/ingredients/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ingredientServices.deleteIngredientById(id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).send("Resource not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
