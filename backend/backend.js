//https
const https = require("https");
const fs = require("fs");

// express js & cors middleware
const express = require("express");
const cors = require("cors");

//web token for user auth
const jwt = require("jsonwebtoken");

// Using .env file for environment variables (DB connection)
const dotenv = require("dotenv");
dotenv.config();

// require mongoose
const mongoose = require("mongoose");

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

// --------------------------------------
//  Services
// --------------------------------------
// Spoonacular API
const recipeAPI = require("./recipeAPI.js");
// MongoDB / Mongoose
const userServices = require("./controllers/user-services");
const recipeServices = require("./controllers/recipe-services");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// designate protected routes
app.use("/recipes", authenticateToken);
app.use("/ingredients", authenticateToken);

// --------------------------------------
//  Token
// --------------------------------------
function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

//use case
//app.get(..., authenticateToken, function (req, res) => ...);
//middleware to authenticate token, used for /services and all nested paths
async function authenticateToken(req, res, next) {
  token = req.headers["token"];
  // if token is null return a response with status 401 and end the request
  if (token == null) res.status(401).send("Unauthorized");
  else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).send("Forbidden");
      else {
        req._id = user.id;
        next();
      }
    });
  }
}

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
app.post("/register", async (req, res) => {
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

// --------------------------------------------------
// USER ENDPOINTS
// --------------------------------------------------
// Get users endpoint:
app.get("/users", async (req, res) => {
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

// Add a Recipe to a User's Saved Recipes endpoint:
// - body of the request to this endpoint contains 1 field: recipe_id
app.post("/users/:id/recipes", async (req, res) => {
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

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe_id = req.params.id;
    const user_id = req._id;
    const result = await userServices.removeRecipe(user_id, recipe_id);
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(201).send({ users_list: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Populate the Recipes for a specific User
app.get("/users/:id/recipes", async (req, res) => {
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

//load in saved recipes
app.get("/recipes", async (req, res) => {
  try {
    //send back recipes associated with user
    const id = req._id;
    const recipes = await userServices.getRecipes(id);
    if (recipes === undefined || recipes.length === 0) {
      res.status(404).send("Recipes not Found for User");
    } else {
      res.status(201).send(recipes).end();
    }
  } catch (error) {
    console.log(error);
    res.status(505).send("Recipes not Found for User");
  }
});

// Get recipe by Id endpoint:
app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await recipeServices.getRecipeByID(id);
    console.log("GOT RESULT: ", result);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.send({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

//search API for recipes
app.post("/recipes", async (req, res) => {
  try {
    const id = req._id;
    parameters = req.body;
    recipes = await recipeAPI.getRecipes(parameters);

    if (recipes === undefined || recipes.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      //check if recipe already exists in DB
      for (let i = 0; i < recipes.length; i++) {
        let recipe = await recipeServices.getRecipeByWebID(recipes[i].id);
        if (recipe) {
          recipes[i] = recipe;
        } else {
          //add recipe to database
          recipes[i] = await recipeServices.addRecipe(recipes[i]);
        }
      }
      const favorites = await userServices.getRecipes(id);
      res.status(201).send({
        favorites: favorites,
        recipes_list: recipes,
      });
    }
  } catch (error) {
    console.log("ERROR IN RECIPE POST");
    console.log(error);
    res.status(500).send("BAD AUTH /services/recipes");
  }
});

//Favorite Recipe
app.patch("/recipes/:id", async (req, res) => {
  try {
    //data base id for user and recipe
    const userID = req._id;
    const recipeID = req.params["id"];
    const result = await userServices.addRecipe(userID, recipeID);
    if (!result) {
      res.status(500).end();
    } else {
      res.status(201).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//Get ratings for recipe
// - most of this functionality is handled in the frontend,
//   this endpoint sends a json object of a recipe
app.get("/recipes/:id/ratings", async (req, res) => {
  try {
    //get recipe ID
    const recipeID = req.params["id"];
    const ratings = await recipeServices.getRatings(recipeID);

    if (ratings === undefined) {
      res.status(404).send("Resource not Found").end();
    } else {
      res.status(201).send(ratings).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//add rating to recipe
app.patch("/recipes/:id/ratings", async (req, res) => {
  try {
    //get recipeID and new rating to add to recipe
    const recipeID = req.params["id"];
    const rating = req.body["rating"];

    //add rating to recipe
    const result = await recipeServices.addRating(recipeID, rating);

    if (!result) {
      res.status(404).end();
    } else {
      res.status(201).send(result).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// --------------------------------------------------
// INGREDIENT ENDPOINTS
// --------------------------------------------------
// Get all ingredients endpoint:

//return ingredients associated with user
app.get("/ingredients", async (req, res) => {
  try {
    const id = req._id;
    const result = await userServices.getIngredients(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(201).send({ ingredients_list: result }); // can be empty array (no error if nothing found)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Create ingredient endpoint:
app.put("/ingredients", async (req, res) => {
  const data = req.body;
  try {
    const id = req._id;
    const updatedUser = await userServices.updateIngredients(
      id,
      data.ingredients
    );

    if (updatedUser) {
      res.status(201).send(updatedUser).end();
    } else {
      res.status(400).send("Bad Request.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// export mongoose connection
module.exports = mongoose;

// defaults to port 8000 if no port is specified in .env file
app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(
      `REST API is listening on: http://localhost:${process.env.PORT}.`
    );
  } else console.log(`REST API is listening on: http://localhost:${port}.`);
});

/*
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("certificates/key.pem"),
      cert: fs.readFileSync("certificates/cert.pem"),
    },
    app
  )
  .listen(process.env.PORT || port, () => {
  if (process.env.PORT) 
    console.log(`REST API is listening on: https://localhost:${process.env.PORT}`);
  else
    console.log(`REST API is listening on: http://localhost:${port}.`); 
});
*/

// recipeAPI.getRecipe( {
//   "ingredients" : ["banana", "milk"],
//   "maxCal" :  1500
// });
