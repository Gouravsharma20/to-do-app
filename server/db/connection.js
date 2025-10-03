const mongoose = require("mongoose");

// Get MongoDB URI from environment variable
const mongoURI = process.env.MONGODB_URI;

// Check if MONGODB_URI exists
if (!mongoURI) {
  console.error("❌ ERROR: MONGODB_URI environment variable is not defined!");
  console.error("Please set MONGODB_URI in Render dashboard");
  process.exit(1);
}

console.log("🔗 Attempting to connect to MongoDB...");

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const dbName = mongoURI.split('/').pop().split('?')[0];
    console.log("📦 Connected to database:", dbName);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = mongoose.connection;