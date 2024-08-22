require("./alias-config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const config = require('./config');
// const notesRoutes = require('./routes/notesRoutes')
const config = require("@config");
const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(config.mongoDbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

//routes
// app.use('/api', (req,res)=>{
//     res.status(200).json({message:'success'})
// });

app.use("/", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "service is healthy" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
