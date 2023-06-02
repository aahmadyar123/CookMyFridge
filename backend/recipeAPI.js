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
    //
    try {
        let queries = "";
        const ret = [];

        //valid seach parameters
        const arrayParams = new Set(["ingredients", "cuisine", "intolerances"]);
        const varParams = new Set(["maxCal", "maxReadyTime"]);

        //parse search paramters and too to url query
        for (let field in params) {
            //handle fields with array values
            if (arrayParams.has(field) && params[field] !== null && params[field].length > 0) {
                queries += "&" + field + "=" + params[field].join(",");
            }
            //handle fields with single variable values
            else if (varParams.has(field) && params[field] !== null) {
                queries += "&" + field + "=" + params[field];
            }
        }

        //send request to API to get recipes
        let url = `https://api.spoonacular.com/recipes/complexSearch?number=3${queries}&addRecipeInformation=true&instructionsRequired=true&apiKey=${process.env.API_KEY}`;
        const response = await axios.get(url);
        const recipes = response.data;

        //parse each recipe
        for (let i = 0; i < recipes.results.length; i++) {
            ret.push(parseRecipe(recipes.results[i]));
        }

        console.log(ret);
        return ret;
    }
    catch (e) {
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

    const newDish = {};

    //fields to parse
    const fields =["id", "title", "servings", "summary", "spoonacularSourceUrl", "readyInMinutes", "image"]; //spoonacular JSON fields
    const newFields = ["id", "name", "servings", "summary", "url", "readyInMinutes", "image"];               //field names in MongoDB databse

    //add data to new JSON
    for (let i = 0; i < fields.length; i++) {
        if (recipe.hasOwnProperty(fields[i])) {
            newDish[newFields[i]] = recipe[fields[i]];
        }
        else {
            newDish[newFields[i]] = null;
        }
    }
    //get calorie information
    recipe.kcal = null;
    if (recipe.hasOwnProperty("nutrition")) {
        if (recipe["nutrition"].hasOwnProperty("nutrients")) {
            if (recipe.nutrition.nutrients.length > 0) {
                if (recipe.nutrition.nutrients[0].hasOwnProperty("kcal")) {
                    newDish["kcal"] = recipe.nutrition.nutrients[0].kcal;
                }
            }
        }
    }
 
    if (recipe.hasOwnProperty("analyzedInstructions") && recipe.analyzedInstructions.length > 0) {
        let data = analyzeInstructions(recipe.analyzedInstructions[0]);
        newDish.ingredients = data.ingredients;
        newDish.steps = data.steps;
    }
    else {
        newDish.ingredients = null;
        newDish.steps = null;
    }

    return newDish
}

function analyzeInstructions(instructions) {
    /*
    Analyzes instructions to make recipe from JSON and updates recipe
    :param instructions: JSON containing instructions on how to make recipe
    return: JSON object containing ingredients and steps to make recipe
    */

    //initialize JSON to return 
    let ret = {};
    ret['ingredients'] = new Set();
    ret['steps'] = []

    //Iterate through all steps and add to array
    for (let i = 0; i < instructions.steps.length; i++) {
        ret.steps.push((instructions.steps[i].step));

        //Iterate through ingredients for each step and add to set of all ingredients required
        for (let j = 0; j < instructions.steps[i].ingredients.length; j++) {
            ret.ingredients.add(instructions.steps[i].ingredients[j].name)
        }
    }
    return ret
}




module.exports = {
    getRecipe,
    parseRecipe,
    analyzeInstructions
};

