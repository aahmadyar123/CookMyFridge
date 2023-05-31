const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        imageLink: {
            type: String,
            required: false,
            trim: true,
        },
        // don't know if we need the following
        // recipes: [{
        //     type: mongoose.Schema.Types.ObjectId, // array of recipe ids (references)
        //     ref: "Recipe",
        //     required: false,
        //     trim: true,
        // }],
        // ex types: "vegetable", "fruit", "meat", "dairy", "grain", "spice", "condiment", "other"
        type: {
            type: String,
            required: false,
            trim: true,
        },
    },
    { collection: "ingredients" }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
