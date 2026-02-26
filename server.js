require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ ADD THIS

const app = express();


// ✅ Enable CORS (IMPORTANT FIX)
app.use(cors({
  origin: [
    "http://localhost:3000", // React local
    "https://ccooking2.vercel.app" // Vercel frontend (add after deploy)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Middleware
app.use(express.json());


// ✅ Debug: Check Environment Variables
console.log("========== ENV DEBUG ==========");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");
console.log("PORT:", process.env.PORT);
console.log("================================");


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 5000;


// ✅ Connect to MongoDB
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