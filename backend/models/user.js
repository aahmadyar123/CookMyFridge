const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 1)
          throw new Error("Invalid password, must be at least 8 characters.");
      }, // would throw database exception with pword length < 8, needs to be caught in try/catch
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of ingredient ids (references)
        ref: "Ingredient",
        required: false,
        trim: true,
      },
    ],
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of recipe ids (references)
        ref: "Recipe",
        required: false,
        trim: true,
      },
    ],
    last_login: {
      type: Date,
      required: false,
      trim: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
