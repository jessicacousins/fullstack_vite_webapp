const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const useragent = require("useragent");
require("dotenv").config();
const cartRoutes = require("./routes/cart");
const learningRoutes = require("./routes/learning");
const snapquestRoutes = require("./routes/snapquestRoutes");
const soundboardRoutes = require("./routes/soundboard");
const timeEntryRoutes = require("./routes/timeEntryRoutes");
const roleRoutes = require("./routes/roles");
const selfieRoutes = require("./routes/selfieRoutes");
const tictactoeRoutes = require("./routes/tictactoeRoutes");
const pollRoutes = require("./routes/pollRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const calendarRoutes = require("./routes/calendarRoutes");

// ! Billing system
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

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

// for the shopping  cart
app.use("/api/cart", cartRoutes);

//  API routes
app.use("/api/users", require("./routes/userRoutes"));

// Blog API routes
app.use("/api/blogs", require("./routes/blog"));

// Mount the news routes
app.use("/api", newsRoutes);

// openAI chatbot routes
const chatbotRoutes = require("./routes/chatbot");
app.use("/api/chatbot", chatbotRoutes);

// openAI learning more feature
app.use("/api/learning", learningRoutes);

// SnapQuest Routes
app.use("/api/snapquest", snapquestRoutes);

// ! billing system
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ! payroll system
app.use("/api/roles", require("./routes/roles"));

app.use("/api/timecards", timeEntryRoutes);

app.use("/api/soundboard", soundboardRoutes);

//  selfie  routes
app.use("/api/selfies", selfieRoutes);

//  tic tac toe route
app.use("/api/tictactoe", tictactoeRoutes);

// ! poll
app.use("/api/polls", pollRoutes);

app.use("/api/medications", medicationRoutes);

app.use("/api/calendar", calendarRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
