const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const recipeServices = require("./controllers/recipe-services");


instruction = { 
    analyzedInstructions: [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                            "ingredients": [
                                {
                                    "id": 4053,
                                    "name": "olive oil",
                                    "localizedName": "olive oil",
                                    "image": "olive-oil.jpg"
                                },
                                {
                                    "id": 0,
                                    "name": "soup",
                                    "localizedName": "soup",
                                    "image": ""
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404667,
                                    "name": "dutch oven",
                                    "localizedName": "dutch oven",
                                    "image": "dutch-oven.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                            "ingredients": [
                                {
                                    "id": 11124,
                                    "name": "carrot",
                                    "localizedName": "carrot",
                                    "image": "sliced-carrot.png"
                                },
                                {
                                    "id": 11143,
                                    "name": "celery",
                                    "localizedName": "celery",
                                    "image": "celery.jpg"
                                },
                                {
                                    "id": 11282,
                                    "name": "onion",
                                    "localizedName": "onion",
                                    "image": "brown-onion.png"
                                }
                            ],
                            "equipment": [],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 3,
                            "step": "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and red lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                            "ingredients": [
                                {
                                    "id": 1102047,
                                    "name": "salt and pepper",
                                    "localizedName": "salt and pepper",
                                    "image": "salt-and-pepper.jpg"
                                },
                                {
                                    "id": 6615,
                                    "name": "vegetable stock",
                                    "localizedName": "vegetable stock",
                                    "image": "chicken-broth.png"
                                },
                                {
                                    "id": 10016069,
                                    "name": "red lentils",
                                    "localizedName": "red lentils",
                                    "image": "red-lentils.png"
                                },
                                {
                                    "id": 11529,
                                    "name": "tomato",
                                    "localizedName": "tomato",
                                    "image": "tomato.png"
                                },
                                {
                                    "id": 10316069,
                                    "name": "lentils",
                                    "localizedName": "lentils",
                                    "image": "lentils-brown.jpg"
                                },
                                {
                                    "id": 11564,
                                    "name": "turnip",
                                    "localizedName": "turnip",
                                    "image": "turnips.png"
                                },
                                {
                                    "id": 11215,
                                    "name": "garlic",
                                    "localizedName": "garlic",
                                    "image": "garlic.png"
                                },
                                {
                                    "id": 0,
                                    "name": "soup",
                                    "localizedName": "soup",
                                    "image": ""
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404794,
                                    "name": "stove",
                                    "localizedName": "stove",
                                    "image": "oven.jpg"
                                },
                                {
                                    "id": 404752,
                                    "name": "pot",
                                    "localizedName": "pot",
                                    "image": "stock-pot.jpg"
                                }
                            ],
                            "length": {
                                "number": 22,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 4,
                            "step": "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                            "ingredients": [
                                {
                                    "id": 5062,
                                    "name": "chicken breast",
                                    "localizedName": "chicken breast",
                                    "image": "chicken-breasts.png"
                                },
                                {
                                    "id": 1042027,
                                    "name": "seasoning",
                                    "localizedName": "seasoning",
                                    "image": "seasoning.png"
                                },
                                {
                                    "id": 11297,
                                    "name": "parsley",
                                    "localizedName": "parsley",
                                    "image": "parsley.jpg"
                                }
                            ],
                            "equipment": [],
                            "length": {
                                "number": 5,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 5,
                            "step": "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!",
                            "ingredients": [
                                {
                                    "id": 10511297,
                                    "name": "fresh parsley",
                                    "localizedName": "fresh parsley",
                                    "image": "parsley.jpg"
                                },
                                {
                                    "id": 0,
                                    "name": "soup",
                                    "localizedName": "soup",
                                    "image": ""
                                }
                            ],
                            "equipment": []
                        }
                    ]
                }
            ],
    }

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
    const fields =["id", "title", "servings", "summary", "spoonacularSourceURL", "readyInMinutes", "image"]; //spoonacular JSON fields
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
    if (recipe.hasOwnProperty("nutrition")) {
        if (recipe["nutrition"].hasOwnProperty("nutrients")) {
            if (recipe.nutrition.nutrients.length > 0) {
                if (recipe.nutrition.nutrients[0].hasOwnProperty("kcal")) {
                    newDish["kcal"] = recipe.nutrition.nutrients[0].kcal;
                }
            }
        }
    }
}

function analyzeInstructions(instructions) {
    /*
    Analyzes instructions to make recipe from JSON and updates recipe
    :param instructions: JSON containing instructions on how to make recipe
    return: JSON object containing ingredients and steps to make recipe
    */

    instructions = instruction.analyzedInstructions[0]
    let ret = {};
    ret['ingredients'] = new Set();
    ret['steps'] = []

    //add ingredients and procedure to JSON
    for (let i = 0; i < instructions.steps.length; i++) {
        ret.steps.push((instructions.steps[i].step));

        //add ingredients required for each step to set of all ingredients required
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

