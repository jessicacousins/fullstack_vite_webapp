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
const chatbotRoutes = require("./routes/chatbot");
const newsRoutes = require("./routes/newsRoutes");

const chatroomsRoutes = require("./routes/chatrooms");

const app = express();

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

// Set additional security headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api/chatrooms", chatroomsRoutes);

// ------------------------------
// !  Socket.io for Multiplayer Quest Game
// ------------------------------
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const ChatRoom = require("./models/ChatRoom");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// NPC response (murder mystery theme)
async function generateNPCResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are a mysterious NPC in a murder mystery game. Respond in character to this message: "${prompt}". Your reply should include hints and intrigue that encourage players to work together to solve the mystery.`,
        },
      ],
      max_tokens: 150,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating NPC response:", error);
    return "I am unable to respond at this moment.";
  }
}

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join_room", async (room) => {
    let chatRoom = await ChatRoom.findOne({ roomName: room });
    if (!chatRoom) {
      chatRoom = new ChatRoom({
        roomName: room,
        isPrivate: false,
        members: [],
      });
      await chatRoom.save();

      const welcomeMessage = `Welcome to "${room}"—a murder mystery awaits! Gather clues, question suspects, and work together to solve the crime.`;

      io.to(room).emit("message", { user: "NPC", text: welcomeMessage });

      chatRoom.messages.push({ sender: "NPC", content: welcomeMessage });
      await chatRoom.save();
    }
    socket.join(room);
    io.to(room).emit("message", {
      user: "System",
      text: `A new player (${socket.id}) has joined room: ${room}`,
    });
  });

  socket.on("send_message", async (data) => {
    io.to(data.room).emit("message", { user: data.user, text: data.message });
    let chatRoom = await ChatRoom.findOne({ roomName: data.room });
    if (chatRoom) {
      chatRoom.messages.push({ sender: data.user, content: data.message });
      await chatRoom.save();
    }

    if (data.message.startsWith("/npc")) {
      const playerPrompt = data.message.replace("/npc", "").trim();
      const npcReply = await generateNPCResponse(playerPrompt);
      io.to(data.room).emit("message", { user: "NPC", text: npcReply });
      if (chatRoom) {
        chatRoom.messages.push({ sender: "NPC", content: npcReply });
        await chatRoom.save();
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
// ------------------------------
// !  End Socket.io
// ------------------------------

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
