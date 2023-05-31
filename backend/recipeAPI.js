const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();



async function getRecipe(ingredients) {
    /*
    Get recipe from spponacular API via GET request
    :param: ingredients: list of available ingredients to create dish
    :return: list of JSON representing diferent dishes
    */
    //parse instructions in array into string to be used in API call
    let input = "";
    for (let i = 0; i < ingredients.length; i++) {
        input += `,+${ingredients[i]}`;
    }
    if (ingredients.length > 0) {
        input = input.slice(2);
    }
    

    //example request
    const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=2&apiKey=${process.env.API_KEY}`);
    console.log(result);
    

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