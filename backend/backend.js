const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Add mongdb user services
const userServices = require("./models/user-services");

const app = express();
const port = 8000;

apps.use(cors());
app.use(express.json());