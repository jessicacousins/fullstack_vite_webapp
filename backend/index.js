const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// connect to MongoDB here
connectDB();

// middleware here
app.use(cors());
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  API routes
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
