const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ MONGODB_URI is not set! Check Render environment variables.");
  process.exit(1);
}

console.log("🔗 Connecting to MongoDB...");

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📦 Database:", mongoURI.split('/').pop().split('?')[0]);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = mongoose.connection;