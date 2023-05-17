// tests 
const request = require('supertest');
const app = require('./backend'); // assuming your app is defined in app.js
const mongoose = require('mongoose');

const dotenv = require("dotenv");

dotenv.config();

// create connection string
connection_string = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PWD + "@" +
                    process.env.MONGO_DB + "?retryWrites=true&w=majority&authSource="+ process.env.MONGO_AUTH_DB;

mongoose.set("debug", process.env.DEBUG);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority&authSource="+
        process.env.MONGO_AUTH_DB,
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

const ingredientsServices = require('./models/ingredient-services');
const Ingredients = require('./models/ingredient');
const usersServices = require('./models/user-services');
const User = require('./models/user');
const recipesServices = require('./models/recipe-services');
const Recipe = require('./models/recipe');

describe('GET /users', () => {
  let db;

  beforeAll(async () => {
    // Connect to the test database before running tests
    db = await mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Disconnect from the test database after running tests
    await db.disconnect();
  });

  beforeEach(async () => {
    // Seed the test database with some ingredients
    await Ingredients.insertMany([
        { name: 'Apple' },
        { name: 'Banana' },
    ]);
    // await ingredientsServices.createIngredient({ name: 'Apple' });
    // await ingredientsServices.createIngredient({ name: 'Banana' });
  });

  afterEach(async () => {
    // Remove all ingredients from the test database after each test
    await User.deleteMany();
  });

  it('should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ]);
  });
});
