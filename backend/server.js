const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((error) => {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
    });

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Urban Cafe Backend is running ☕",
        database: "MongoDB"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});