// tests 
const request = require('supertest');
const app = require('./backend'); // assuming your app is defined in app.js
const mongoose = require('mongoose');

const ingredientsServices = require('./models/ingredient-services');
const Ingredients = require('./models/ingredient');
const usersServices = require('./models/user-services');
const recipesServices = require('./models/recipe-services');

describe('GET /users', () => {
  let db;

  beforeAll(async () => {
    // Connect to the test database before running tests
    const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority';
    db = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
