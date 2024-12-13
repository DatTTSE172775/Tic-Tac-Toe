const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

module.exports = app;
