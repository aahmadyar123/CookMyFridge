const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const recipeServices = require("./controllers/recipe-services");



async function getRecipe(params) {
    /*
    Get recipe from spponacular API via GET request
    :param: params: JSON containing information for search query on recipe
    :return: list of JSON representing diferent dishes with parsed information
    */
    //parse instructions in array into string to be used in API call
    let queries = "";
    
    

    try {
    //example request
    //const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${input}&number=2&apiKey=${process.env.API_KEY}`);
    //console.log(result);
    }
    catch(e) {
        console.log(e);
        return null;
    }
    

}



function parseRecipe(recipe) {
    /*
    Parses JSON containing information about recipe and puts in database
    :param recipe: JSON object representing recipe
    :return: new JSON containing important information about recipe
    */
    //new JSON and fields to parse for
    let newDish = {};

    //fields to parse
    const fields =["id", "title", "servings", "summary", "spoonacularSourceURL", "readyInMinutes"]; //spoonacular JSON fields
    const newFields = ["id", "name", "servings", "summary", "url", "readyInMinutes"];               //field names in MongoDB databse

    //add data to new JSON
    for (let i = 0; i < fields.length; i++) {
        if (recipe.hasOwnProperty(fields[i])) {
            newDish[newFields[i]] = recipe[field];
        }
        else {
            newDish[newFields[i]] = null;
        }
    }
    
}

function analyzeInstructions(instructions) {
    /*
    Analyzes instructions to make recipe from JSON and updates recipe
    :param instructions: JSON containing instructions on how to make recipe
    return: JSON object containing ingredients and steps to make recipe
    */

}



module.exports = {
    getRecipe
};