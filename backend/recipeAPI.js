const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const recipeServices = require("./controllers/recipe-services");


test = {
    "results": [
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": true,
            "veryHealthy": true,
            "cheap": false,
            "veryPopular": true,
            "sustainable": false,
            "lowFodmap": false,
            "weightWatcherSmartPoints": 11,
            "gaps": "no",
            "preparationMinutes": 10,
            "cookingMinutes": 45,
            "aggregateLikes": 1866,
            "healthScore": 100,
            "creditsText": "pinkwhen.com",
            "sourceName": "pinkwhen.com",
            "pricePerServing": 300.45,
            "id": 715415,
            "title": "Red Lentil Soup with Chicken and Turnips",
            "readyInMinutes": 55,
            "servings": 8,
            "sourceUrl": "http://www.pinkwhen.com/red-lentil-soup-with-chicken-and-turnips/",
            "image": "https://spoonacular.com/recipeImages/715415-312x231.jpg",
            "imageType": "jpg",
            "summary": "Red Lentil Soup with Chicken and Turnips might be a good recipe to expand your main course repertoire. This recipe serves 8 and costs $3.0 per serving. One serving contains <b>477 calories</b>, <b>27g of protein</b>, and <b>20g of fat</b>. It is brought to you by Pink When. 1866 people have tried and liked this recipe. It can be enjoyed any time, but it is especially good for <b>Autumn</b>. From preparation to the plate, this recipe takes approximately <b>55 minutes</b>. It is a good option if you're following a <b>gluten free and dairy free</b> diet. Head to the store and pick up salt and pepper, canned tomatoes, flat leaf parsley, and a few other things to make it today. Overall, this recipe earns a <b>spectacular spoonacular score of 99%</b>. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/red-lentil-and-chicken-soup-682185\">Red Lentil and Chicken Soup</a>, <a href=\"https://spoonacular.com/recipes/red-lentil-and-chicken-soup-1058971\">Red Lentil and Chicken Soup</a>, and <a href=\"https://spoonacular.com/recipes/red-lentil-soup-34121\">Red-Lentil Soup</a>.",
            "cuisines": [],
            "dishTypes": [
                "lunch",
                "soup",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free",
                "dairy free"
            ],
            "occasions": [
                "fall",
                "winter"
            ],
            "analyzedInstructions": [
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
            "spoonacularSourceUrl": "https://spoonacular.com/red-lentil-soup-with-chicken-and-turnips-715415",
            "nutrition": {
                "nutrients": [
                    {
                        "name": "Calories",
                        "amount": 477.238,
                        "unit": "kcal"
                    }
                ]
            }
        },
        {
            "vegetarian": false,
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "veryHealthy": true,
            "cheap": false,
            "veryPopular": false,
            "sustainable": false,
            "lowFodmap": false,
            "weightWatcherSmartPoints": 12,
            "gaps": "no",
            "preparationMinutes": -1,
            "cookingMinutes": -1,
            "aggregateLikes": 159,
            "healthScore": 85,
            "creditsText": "pinkwhen.com",
            "sourceName": "pinkwhen.com",
            "pricePerServing": 435.16,
            "id": 795751,
            "title": "Chicken Fajita Stuffed Bell Pepper",
            "readyInMinutes": 45,
            "servings": 3,
            "sourceUrl": "http://www.pinkwhen.com/chicken-fajita-stuffed-bell-pepper/",
            "image": "https://spoonacular.com/recipeImages/795751-312x231.jpg",
            "imageType": "jpg",
            "summary": "Chicken Fajita Stuffed Bell Pepper takes approximately <b>45 minutes</b> from beginning to end. Watching your figure? This gluten free recipe has <b>526 calories</b>, <b>50g of protein</b>, and <b>24g of fat</b> per serving. For <b>$4.35 per serving</b>, you get a main course that serves 3. 159 people have made this recipe and would make it again. This recipe is typical of Mexican cuisine. This recipe from Pink When requires cumin, cilantro, salsa, and chili powder. All things considered, we decided this recipe <b>deserves a spoonacular score of 98%</b>. This score is amazing. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/stuffed-bell-peppers-551310\">Stuffed Bell Peppers</a>, <a href=\"https://spoonacular.com/recipes/stuffed-bell-pepper-1348405\">Stuffed Bell Pepper</a>, and <a href=\"https://spoonacular.com/recipes/stuffed-bell-pepper-526845\">Stuffed Bell Pepper</a>.",
            "cuisines": [
                "Mexican"
            ],
            "dishTypes": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ],
            "diets": [
                "gluten free"
            ],
            "occasions": [],
            "analyzedInstructions": [
                {
                    "name": "",
                    "steps": [
                        {
                            "number": 1,
                            "step": "To get started heat oven to 35",
                            "ingredients": [],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "localizedName": "oven",
                                    "image": "oven.jpg"
                                }
                            ]
                        },
                        {
                            "number": 2,
                            "step": "Mix salt, pepper, cilantro, cumin, chili powder, and quinoa together and place to the side.",
                            "ingredients": [
                                {
                                    "id": 2009,
                                    "name": "chili powder",
                                    "localizedName": "chili powder",
                                    "image": "chili-powder.jpg"
                                },
                                {
                                    "id": 11165,
                                    "name": "cilantro",
                                    "localizedName": "cilantro",
                                    "image": "cilantro.png"
                                },
                                {
                                    "id": 1002030,
                                    "name": "pepper",
                                    "localizedName": "pepper",
                                    "image": "pepper.jpg"
                                },
                                {
                                    "id": 20035,
                                    "name": "quinoa",
                                    "localizedName": "quinoa",
                                    "image": "uncooked-quinoa.png"
                                },
                                {
                                    "id": 1002014,
                                    "name": "cumin",
                                    "localizedName": "cumin",
                                    "image": "ground-cumin.jpg"
                                },
                                {
                                    "id": 2047,
                                    "name": "salt",
                                    "localizedName": "salt",
                                    "image": "salt.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 3,
                            "step": "Cut the bell pepper in half (if you havent already) and clean out the seeds.",
                            "ingredients": [
                                {
                                    "id": 10211821,
                                    "name": "bell pepper",
                                    "localizedName": "bell pepper",
                                    "image": "bell-pepper-orange.png"
                                },
                                {
                                    "id": 93818,
                                    "name": "seeds",
                                    "localizedName": "seeds",
                                    "image": "sunflower-seeds.jpg"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 4,
                            "step": "Layer quinoa and then grilled chicken into the pepper, and then top each with cheese.",
                            "ingredients": [
                                {
                                    "id": 1015114,
                                    "name": "grilled chicken",
                                    "localizedName": "grilled chicken",
                                    "image": "rotisserie-chicken.png"
                                },
                                {
                                    "id": 1041009,
                                    "name": "cheese",
                                    "localizedName": "cheese",
                                    "image": "cheddar-cheese.png"
                                },
                                {
                                    "id": 1002030,
                                    "name": "pepper",
                                    "localizedName": "pepper",
                                    "image": "pepper.jpg"
                                },
                                {
                                    "id": 20035,
                                    "name": "quinoa",
                                    "localizedName": "quinoa",
                                    "image": "uncooked-quinoa.png"
                                }
                            ],
                            "equipment": []
                        },
                        {
                            "number": 5,
                            "step": "Place in the oven for about 10 minutes until the bell pepper has softened.Chicken Fajita Stuffed Bell Pepper",
                            "ingredients": [
                                {
                                    "id": 10211821,
                                    "name": "bell pepper",
                                    "localizedName": "bell pepper",
                                    "image": "bell-pepper-orange.png"
                                },
                                {
                                    "id": 5006,
                                    "name": "whole chicken",
                                    "localizedName": "whole chicken",
                                    "image": "whole-chicken.jpg"
                                }
                            ],
                            "equipment": [
                                {
                                    "id": 404784,
                                    "name": "oven",
                                    "localizedName": "oven",
                                    "image": "oven.jpg"
                                }
                            ],
                            "length": {
                                "number": 10,
                                "unit": "minutes"
                            }
                        },
                        {
                            "number": 6,
                            "step": "Top with avocado and serve with shredded lettuce and salsa for a complete meal.This is SO GOOD! I love bell peppers, and I love all of these flavors that are married together that make this chicken fajita stuffed bell pepper so amazing. I could seriously just eat the flavored quinoa all by itself.If you are looking for even more delicious and healthy recipes, make sure you head over to the Simple Fit Forty tab under the cooking section of this blog. We have all of our favorite healthy recipes listed for you right there in one spot. You can also drool over out latest on the Simple Fit Forty Instagram page.If you are looking to get healthy and fit, come and join the super secret and awesome Simple Fit Forty Lifestyle community over on Facebook. We would love to have you join!",
                            "ingredients": [
                                {
                                    "id": 10211821,
                                    "name": "bell pepper",
                                    "localizedName": "bell pepper",
                                    "image": "bell-pepper-orange.png"
                                },
                                {
                                    "id": 9037,
                                    "name": "avocado",
                                    "localizedName": "avocado",
                                    "image": "avocado.jpg"
                                },
                                {
                                    "id": 5006,
                                    "name": "whole chicken",
                                    "localizedName": "whole chicken",
                                    "image": "whole-chicken.jpg"
                                },
                                {
                                    "id": 11252,
                                    "name": "lettuce",
                                    "localizedName": "lettuce",
                                    "image": "iceberg-lettuce.jpg"
                                },
                                {
                                    "id": 20035,
                                    "name": "quinoa",
                                    "localizedName": "quinoa",
                                    "image": "uncooked-quinoa.png"
                                },
                                {
                                    "id": 6164,
                                    "name": "salsa",
                                    "localizedName": "salsa",
                                    "image": "salsa.png"
                                }
                            ],
                            "equipment": []
                        }
                    ]
                }
            ],
            "spoonacularSourceUrl": "https://spoonacular.com/chicken-fajita-stuffed-bell-pepper-795751",
            "nutrition": {
                "nutrients": [
                    {
                        "name": "Calories",
                        "amount": 526.088,
                        "unit": "kcal"
                    }
                ]
            }
        }
    ],
    "offset": 0,
    "number": 2,
    "totalResults": 590
}


function getRecipe(params) {
    /*
    Get recipe from spponacular API via GET request
    :param: params: JSON containing information for search query on recipe
    :return: list of JSON representing diferent dishes with parsed information
    */
    //parse instructions in array into string to be used in API call
    let queries = "";

    let ret = [];
    let recipes = test;
    for (let i = 0; i < recipes.results.length; i++) {
        ret.push(parseRecipe(recipes.results[i]))
    }
    
    return ret
    
    

    /*
    try {
    //example request
    //const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${input}&number=2&apiKey=${process.env.API_KEY}`);
    //console.log(result);
    }
    catch(e) {
        console.log(e);
        return null;
    }
    */
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

