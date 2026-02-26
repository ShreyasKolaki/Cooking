require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ✅ Debug: Check Environment Variables
console.log("========== ENV DEBUG ==========");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("================================");

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB with proper error logging
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
    process.exit(1);
  });