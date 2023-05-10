const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Add mongdb user services
const userServices = require("./models/user-services");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
