const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Connected to database:", mongoURI.split('/').pop().split('?')[0]);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = mongoose.connection;