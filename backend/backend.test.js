const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const User = require("./models/user");

const dotenv = require("dotenv");
dotenv.config();

const recipeServices = require("./controllers/recipe-services");
const userServices = require("./controllers/user-services");

jest.setTimeout(30000); // 30 second timeout for all tests

describe("Test Suite", () => {
  beforeAll(async () => {
    // if there is an existing mongoose connection, end it
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
    }

    // connect to test database (it should always be empty)
    const connectionString =
      "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      "testDB";

    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("User Model", () => {
    describe("register()", () => {
      beforeEach(async () => {
        await User.deleteMany({});
      });

      it("should return undefined for an invalid password", async () => {
        const email = "test@test.test";
        const badPword = "test";

        const badUser = await userServices.register(email, badPword);
        expect(badUser).toBeUndefined();
      });

      it("should create a new user with valid credentials", async () => {
        const email = "test@test.test";
        const goodPword = "test1234";

        const goodUser = await userServices.register(email, goodPword);
        expect(goodUser).toBeDefined();
        expect(goodUser.email).toBe(email);
        expect(goodUser.ingredients).toEqual([]);
        expect(goodUser.recipes).toEqual([]);
        expect(goodUser.friends).toEqual([]);
        // check that password is hashed, not stored as plaintext
        expect(goodUser.password).not.toBe(goodPword);
      });

      it("should not allow duplicate email registration", async () => {
        const email = "test@test.test";
        const goodPword = "test1234";

        // First registration
        const firstUser = await userServices.register(email, goodPword);
        expect(firstUser).toBeDefined();

        // Second registration with the same email should return undefined
        const duplicateUser = await userServices.register(email, goodPword);
        expect(duplicateUser).toBeUndefined();
      });
    });

    describe("login()", () => {
      beforeEach(async () => {
        await User.deleteMany({});

        // create a user for testing password validation
        const email = "test@test.com";
        const password = "test1234";
        await userServices.register(email, password);
      });

      it("should return undefined for an invalid email", async () => {
        const email = "abcdefg@com.com";
        const password = "test1234";

        const user = await userServices.login(email, password);
        expect(user).toBeUndefined();
      });

      it("should return undefined for an invalid password", async () => {
        const email = "test@test.com";
        const invalidPassword = "thisIsNotThePassword";
        const user = await userServices.login(email, invalidPassword);
        expect(user).toBeUndefined();
      });

      it("should return a user object for valid credentials", async () => {
        const email = "test@test.com";
        const password = "test1234";
        const user = await userServices.login(email, password);
        expect(user).toBeDefined();
        expect(user.email).toBe(email);
      });
    });

    describe("More User Services", () => {
      let userId;
      let mongo_recipeId;

      beforeAll(async () => {
        await User.deleteMany({});

        // create a user for testing services
        const email = "test@test.com";
        const password = "test1234";
        const user = await userServices.register(email, password);
        console.log(user);
        userId = user._id;
      });

      afterAll(async () => {
        await User.deleteMany({});
      });

      it("test getUsers() - empty", async () => {
        const users = await userServices.getUsers("name");
        expect(users).toBeDefined();
        expect(users).toEqual([]);
      });

      it("test findUserById() - valid userId", async () => {
        const user = await userServices.findUserById(userId);
        expect(user).toBeDefined();
        expect(user.email).toBe("test@test.com");
      });

      it("test findUserById() - invalid userId", async () => {
        const user = await userServices.findUserById("12345");
        expect(user).toBeUndefined();
      });

      it("test getIngredients() - empty", async () => {
        const user = await userServices.getIngredients(userId);
        expect(user).toBeDefined();
        expect(user.ingredients).toEqual([]);
      });

      it("test getIngredients() - error, bad userId", async () => {
        const user = await userServices.getIngredients("12345");
        expect(user).toBeUndefined();
      });

      it("test updateIngredients() - userId & ingredients list", async () => {
        const ingredients = ["apple", "banana", "carrot"];
        const updatedUser = await userServices.updateIngredients(
          userId,
          ingredients
        );
        expect(updatedUser).toBeDefined();
        console.log("Expected Ingredients: " + ingredients);
        console.log("Actual Ingredients: " + updatedUser.ingredients);
        expect(updatedUser.ingredients).toEqual(ingredients);
      });

      it("test updateIngredients() - error, bad userId", async () => {
        const ingredients = ["apple", "banana", "carrot"];
        const updatedUser = await userServices.updateIngredients(
          "12345",
          ingredients
        );
        expect(updatedUser).toBeUndefined();
      });

      it("test getIngredients() - not empty", async () => {
        const user = await userServices.getIngredients(userId);
        expect(user).toBeDefined();
        expect(user.ingredients).toEqual(["apple", "banana", "carrot"]);
      });

      it("test getRecipes() - empty", async () => {
        const recipes = await userServices.getRecipes(userId);
        expect(recipes).toEqual([]);
      });

      it("test getRecipes() - error, bad userId", async () => {
        const recipes = await userServices.getRecipes("12345");
        expect(recipes).toBeUndefined();
      });

      it("test userServices.addRecipe() - error, bad userId", async () => {
        const fake_spoonacular_recipe_id = "12345";
        const bool_return = await userServices.addRecipe(
          "12345",
          fake_spoonacular_recipe_id
        );
        expect(bool_return).toBe(false);
      });

      let spoon_id = 638604;

      describe("recipeServices.addRecipe() - necessary subtests", () => {
        // recipe data
        //let spoon_id = 638604;
        let name = "Chilled Swiss Oatmeal";
        let servings = 1;
        let summary = `Chilled Swiss Oatmeal takes roughly <b>10 minutes</b> from beginning to end...`;
        let url = "https://spoonacular.com/chilled-swiss-oatmeal-638604";
        let readyInMinutes = 10;
        let image = "https://spoonacular.com/recipeImages/638604-312x231.jpg";
        let kcal = 523;
        let ingredients = [
          "oatmeal",
          "yogurt",
          "milk",
          "apple",
          "banana",
          "fruit",
          "nuts",
        ];
        let steps = [
          "-In a small bowl, add oatmeal, yogurt, milk and combine.",
          "Let it sit for few minutes or several hours in the refrigerator. Then add apples, banana, dried fruits and stir until well combined.",
          "Top with nuts and serve.",
        ];

        beforeAll(async () => {
          let recipe = {
            id: spoon_id,
            name: name,
            servings: servings,
            summary: summary,
            url: url,
            readyInMinutes: readyInMinutes,
            image: image,
            kcal: kcal,
            ingredients: ingredients,
            steps: steps,
          };

          const savedRecipe = await recipeServices.addRecipe(recipe);
          mongo_recipeId = new mongoose.Types.ObjectId(savedRecipe._id);
          // mongo_recipeId = savedRecipe._id;
          console.log("mongo_recipeId: " + mongo_recipeId);
        });

        it("test userServices.addRecipe() - valid userId & recipe", async () => {
          const bool_return = await userServices.addRecipe(
            userId,
            mongo_recipeId
          );
          expect(bool_return).toBe(true);
        });

        it("test userServices.addRecipe() - repeat recipe", async () => {
          const bool_return = await userServices.addRecipe(
            userId,
            mongo_recipeId
          );
          expect(bool_return).toBe(true);
          // expect to still only find one recipe in the user's recipe list with
          // this recipeId
          const recipes = await userServices.getRecipes(userId);
          expect(recipes.length).toBe(1);
        });

        it("test userServices.removeRecipe() - invalid recipeId", async () => {
          const bool_return = await userServices.removeRecipe(userId, "12345");
          expect(bool_return).toBe(false);
        });

        it("test userServices.removeRecipe() - invalid userId", async () => {
          const bool_return = await userServices.removeRecipe(
            "12345",
            mongo_recipeId
          );
          expect(bool_return).toBe(false);
        });

        // This test is failing because of strange issues with the ObjectId
        // datatype that seem to only be present in the fields that store
        // objectIds in an array
        it("test userServices.removeRecipe() - valid userId & recipeId", async () => {
          // let user_recs = await userServices.getRecipes(userId);
          // expect(user_recs.length).toBe(1);

          // console.log("user_recipes: " + user_recs);

          // const user = await User.find({ _id: userId });
          // console.log("user: " + user);

          // console.log("user.recipes: " + user.recipes);

          const bool_return = await userServices.removeRecipe(
            userId,
            mongo_recipeId
          );
          expect(bool_return).toBe(true);
          // expect to not find any recipes in the user's recipe list with
          // this recipeId
          const recipes = await userServices.getRecipes(userId);
          expect(recipes.length).toBe(0);
        });
      });
    });
  });

  // Recipe Model Tests
  describe("Recipe Model", () => {
    let db_id; //new mongoose.Types.ObjectId();
    let web_recipeId = 638604;
    let name = "Chilled Swiss Oatmeal";
    let servings = 1;
    let summary = `Chilled Swiss Oatmeal takes roughly <b>10 minutes</b> from beginning to end...`;
    let url = "https://spoonacular.com/chilled-swiss-oatmeal-638604";
    let readyInMinutes = 10;
    let image = "https://spoonacular.com/recipeImages/638604-312x231.jpg";
    let kcal = 523;
    let ingredients = [
      "oatmeal",
      "yogurt",
      "milk",
      "apple",
      "banana",
      "fruit",
      "nuts",
    ];
    let steps = [
      "-In a small bowl, add oatmeal, yogurt, milk and combine.",
      "Let it sit for few minutes or several hours in the refrigerator. Then add apples, banana, dried fruits and stir until well combined.",
      "Top with nuts and serve.",
    ];

    let test_recipe = {
      id: web_recipeId,
      name: name,
      servings: servings,
      summary: summary,
      url: url,
      readyInMinutes: readyInMinutes,
      image: image,
      kcal: kcal,
      ingredients: ingredients,
      steps: steps,
    };

    beforeAll(async () => {
      // clear the database of recipes
      await Recipe.deleteMany({});
    });

    afterAll(async () => {
      // clear the database of recipes
      await Recipe.deleteMany({});
    });

    it("test recipeServices.addRecipe() invalid recipe", () => {
      const recipe = undefined;
      const savedRecipe = recipeServices.addRecipe(recipe);
      expect(savedRecipe).toBeUndefined();
    });

    it("test recipeServices.addRecipe() valid recipe", async () => {
      const savedRecipe = await recipeServices.addRecipe(test_recipe);
      expect(savedRecipe).toBeDefined();
      expect(savedRecipe.id).toBe(web_recipeId);
      expect(savedRecipe.name).toBe(name);
      expect(savedRecipe.servings).toBe(servings);
      expect(savedRecipe.summary).toBe(summary);
      expect(savedRecipe.url).toBe(url);
      expect(savedRecipe.readyInMinutes).toBe(readyInMinutes);
      expect(savedRecipe.image).toBe(image);
      expect(savedRecipe.kcal).toBe(kcal);
      expect(savedRecipe.ingredients).toEqual(ingredients);
      expect(savedRecipe.steps).toEqual(steps);

      db_id = new mongoose.Types.ObjectId(savedRecipe._id);
      // db_id = savedRecipe._id;
    });

    it("test recipeServices.getRecipeByWebID() invalid recipeId", async () => {
      const recipe = await recipeServices.getRecipeByWebID(12345);
      expect(recipe).toBeUndefined();
    });

    it("test recipeServices.getRecipeByWebID() valid recipeId", async () => {
      const recipe = await recipeServices.getRecipeByWebID(web_recipeId);
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(web_recipeId);
      expect(recipe.name).toBe(name);
      expect(recipe.servings).toBe(servings);
      expect(recipe.summary).toBe(summary);
      expect(recipe.url).toBe(url);
      expect(recipe.readyInMinutes).toBe(readyInMinutes);
      expect(recipe.image).toBe(image);
      expect(recipe.kcal).toBe(kcal);
      expect(recipe.ingredients).toEqual(ingredients);
      expect(recipe.steps).toEqual(steps);
    });

    it("test recipeServices.getRecipeByID() invalid id", async () => {
      const recipe = await recipeServices.getRecipeByID("12345");
      expect(recipe).toBeUndefined();
    });

    it("test recipeServices.getRecipeByID() valid id", async () => {
      const recipe = await recipeServices.getRecipeByID(db_id);
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(web_recipeId);
      expect(recipe.name).toBe(name);
      expect(recipe.servings).toBe(servings);
      expect(recipe.summary).toBe(summary);
      expect(recipe.url).toBe(url);
      expect(recipe.readyInMinutes).toBe(readyInMinutes);
      expect(recipe.image).toBe(image);
      expect(recipe.kcal).toBe(kcal);
      expect(recipe.ingredients).toEqual(ingredients);
      expect(recipe.steps).toEqual(steps);
    });

    it("test recipeServices.getRatings() invalid recipeId", async () => {
      const ratings = await recipeServices.getRatings("12345");
      expect(ratings).toBeUndefined();
    });

    it("test recipeServices.getRatings() valid recipeId", async () => {
      // this actually returns a recipe object as well since ratings are
      // handled on the frontend by interacting with the recipe object
      // i.e. the FE is inneficient in this regard (ratings)
      const recipe = await recipeServices.getRatings(db_id);
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(web_recipeId);
    });

    let rating = {
      score: 5,
      name: "testerRater",
      comment: "this is a test comment",
    };

    let bad_rating = {
      score: -1,
      name: "invalidRating",
      comment: "this is a test comment",
    };

    it("test recipeServices.addRating() invalid recipeId", async () => {
      const rating = await recipeServices.addRating("12345", rating);
      expect(rating).toBeUndefined();
    });

    it("test recipeServices.addRating() valid recipeId", async () => {
      const recipe = await recipeServices.addRating(db_id, rating);
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(web_recipeId);
      expect(recipe.ratings.length).toBe(1);
    });

    it("test recipeServices.addRating() invalid rating", async () => {
      const recipe = await recipeServices.addRating(db_id, bad_rating);
      expect(recipe).toBeUndefined();
    });
  });
});
