const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    //recipe id from spoonacular
    id: {
      type: String,
      required: true,
    },
    //recipe name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    //recipe description
    summary: {
      type: String,
      required: false,
      trim: true,
    },

    //link to image of recipe
    image: {
      type: String,
      required: false,
      trim: false,
    },

    //link to recipe on spoonacular website
    url: {
      type: String,
      required: false,
      trim: false,
    },

    //overall rating
    rating: {
      type: Number,
      required: false,
      trim: true,
    },

    //individual user ratings
    ratings: [
      {
        type: {
          stars: Number,
          name: String,
          comment: String,
        },
        required: false,
        trim: true,
      },
    ],

    //ingredients required in recipe
    ingredients: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],

    //kcals in recipe
    kcal: {
      type: Number,
      required: false,
      trim: false,
    },

    //time to prepare food
    readyInMinutes: {
      type: Number,
      required: false,
      trim: false,
    },

    //how many servings recipe makes
    servings: {
      type: Number,
      required: false,
      trim: false,
    },

    steps: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
  },

  { collection: "recipes" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
