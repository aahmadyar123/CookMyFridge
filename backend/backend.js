// express js & cors middleware
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

// Using .env file for environment variables (DB connection)
const dotenv = require("dotenv");
dotenv.config();

//import middleware functions
const middleware = require("./middleware");

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

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

//express session
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// auth middleware for protected routes
app.use("/recipes", middleware.authenticateToken);
app.use("/ingredients", middleware.authenticateToken);

//use routes defined by express router
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
