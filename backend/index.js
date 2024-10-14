const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const useragent = require("useragent");
require("dotenv").config();

const app = express();

const newsRoutes = require("./routes/newsRoutes");

// connect to MongoDB here
connectDB();

// middleware here
app.use(cors());
// app.use(express.json());

// Increase payload limit for JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  API routes
app.use("/api/users", require("./routes/userRoutes"));

// Blog API routes
app.use("/api/blogs", require("./routes/blog"));

// Mount the news routes
app.use("/api", newsRoutes);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
