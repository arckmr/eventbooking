require("./alias-config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("@config");
const eventRoutes = require("./routes/bookingRoutes");

mongoose
  .connect(config.mongoDbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

app.use("/", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
