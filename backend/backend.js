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

//connect to remote DB
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


//import routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/authRoutes")
const ingredientRoutes = require("./routes/authRoutes")
const recipeRoutes = require("./routes/authRoutes")


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

// auth middleware for protected routes
app.use("/recipes", authenticateToken);
app.use("/ingredients", authenticateToken);


//imported routes
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);


// --------------------------------------
//  Token
// --------------------------------------
//use case
//app.get(..., authenticateToken, function (req, res) => ...);
//middleware to authenticate token, used for protected routes
async function authenticateToken(req, res, next) {
  token = req.headers.Authorization;
  // if token is null return a response with status 401 and end the request
  if (token == null) res.status(401).send("Unauthorized");
  else {
    jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).send("Forbidden");
      else {
        req._id = user.id;
        next();
      }
    });
  }
}


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
