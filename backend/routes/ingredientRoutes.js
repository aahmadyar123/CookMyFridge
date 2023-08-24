const express = require("express");
const router = express.Router();


// --------------------------------------------------
// INGREDIENT ENDPOINTS
// --------------------------------------------------
// Get all ingredients endpoint:

//return ingredients associated with user
router.get("/", async (req, res) => {
  try {
    const id = req._id;
    const result = await userServices.getIngredients(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(201).send({ ingredients_list: result }); // can be empty array (no error if nothing found)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});

// Create ingredient endpoint:
router.put("/", async (req, res) => {
  const data = req.body;
  try {
    const id = req._id;
    const updatedUser = await userServices.updateIngredients(
      id,
      data.ingredients
    );

    if (updatedUser) {
      res.status(201).send(updatedUser).end();
    } else {
      res.status(400).send("Bad Request.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
});


modules.exports = router;
