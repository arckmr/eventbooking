require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const config = require("@config");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/", eventRoutes);

// MongoDB connection
mongoose
  .connect(config.mongoDbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Event service running on port ${port}`);
});
