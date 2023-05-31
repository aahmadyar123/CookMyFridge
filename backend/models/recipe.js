const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    details: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of details ids (references)
        ref: "Details",
        required: false,
        trim: true,
      },
    ],

    dietary_restrictions: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of restrictions ids (references)
        ref: "dietary_restrictions",
        required: false,
        trim: true,
      },
    ],

    region: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of region ids (references)
        ref: "Region",
        required: false,
        trim: true,
      },
    ],

    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId, // array of ingredients ids (references)
        ref: "Ingredient",
        required: false,
        trim: true,
      },
    ],
  },

  { collection: "recipes" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
