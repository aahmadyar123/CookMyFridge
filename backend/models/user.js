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
    },
    ingredients: {
      type: [String], // array of ingredient ids (references)
      required: false,
      default: [],
      trim: true,
    },

    recipes: {
      type: [mongoose.Schema.Types.ObjectId], // array of recipe ids (references)
      ref: "Recipe",
      required: false,
      default: [],
      trim: true,
    },
    last_login: {
      type: Date,
      required: false,
      trim: true,
    },

    friends: {
      type: [mongoose.Schema.Types.ObjectId], // array of user ids (references)
      ref: "User",
      required: false,
      trim: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
