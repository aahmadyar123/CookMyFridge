import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();



async function getRecipe(ingredients) {
    /*
    Get recipe from spponacular API via GET request
    :param: ingredients: list of available ingredients to create dish
    :return: list of JSON representing diferent dishes
    */

    //example request
    //const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour&number=2&apiKey=${process.env.API_KEY}`);
    

}
 

async function analyzeRecipe(recipeID) {
    /*
    Analyze recipe received from spoonacular API via GET requst to get procedure to produce dish
    :param recipeID: recipe ID according from spoonacular API
    :return: string representing procedure to create recipe
    */
    
    //example request
    //const result = await axios.get(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions${process.env.API_KEY}`);
}




module.exports = {
    getRecipe,
    analyzeRecipe
};