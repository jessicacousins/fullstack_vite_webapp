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
const patternRoutes = require("./routes/patternRoutes");

const chatroomsRoutes = require("./routes/chatrooms");
const usHistoryFactRoutes = require("./routes/usHistoryFactRoutes");
const foodRecipeRoutes = require("./routes/foodRecipeRoutes");
const worldCultureRoutes = require("./routes/worldCultureRoutes");
const testTrainingRoutes = require("./routes/testTrainingRoutes");

const wowRoutes = require("./routes/wowRoutes");

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
app.use("/api/patterns", patternRoutes);
app.use("/api/us-history-fact", usHistoryFactRoutes);
app.use("/api/food-recipe", foodRecipeRoutes);
app.use("/api/world-culture", worldCultureRoutes);

app.use("/api/test-trainings", testTrainingRoutes);

// ! World of Warcraft API
app.use("/api/wow", wowRoutes);

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

let activeMysteries = {}; // Store ongoing mysteries per room

// Generate randomized AI-generated mystery
async function generateAIStory() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a funny NPC in a family-friendly murder mystery chat game.
          Your task is to generate a **completely random** and **unique** mystery every time a user requests one.
          The mystery should **never repeat** and should be **comical** (e.g., stolen socks, missing pizza, pranked boss, etc.).
          Choose **three totally random suspects** with unique personalities.
          Pick **one suspect as the culprit (randomly choose index 0, 1, or 2)** and provide a **hilarious reason** why they did it.

          **Format the response like this (DO NOT BREAK FORMAT):**
          Mystery: [Funny setup]
          Suspects: ["Suspect 1 - description", "Suspect 2 - description", "Suspect 3 - description"]
          Culprit: [0, 1, or 2]
          Answer: [Funny explanation of the culprit’s motive]`,
        },
      ],
      max_tokens: 300,
    });

    const aiResponse = response.choices[0].message.content.trim();
    const match = aiResponse.match(
      /Mystery: (.*?)\nSuspects: \["(.*?)", "(.*?)", "(.*?)"\]\nCulprit: (\d)\nAnswer: (.*)/
    );

    if (!match) {
      throw new Error("Failed to parse OpenAI response.");
    }

    return {
      mystery: match[1],
      suspects: [match[2], match[3], match[4]],
      culprit: parseInt(match[5], 10),
      answer: match[6],
    };
  } catch (error) {
    console.error("Error generating AI story:", error);
    return {
      mystery: "The AI took a nap and forgot to write a mystery! Try again.",
      suspects: [
        "A confused toaster - always getting into trouble",
        "A sneaky raccoon - known for stealing shiny objects",
        "A banana in disguise - nobody suspects the fruit",
      ],
      culprit: 0,
      answer:
        "It was the confused toaster! It mistook the missing item for bread.",
    };
  }
}

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // User joins a room
  socket.on("join_room", async ({ room, username }) => {
    let chatRoom = await ChatRoom.findOne({ roomName: room });
    if (!chatRoom) {
      chatRoom = new ChatRoom({
        roomName: room,
        isPrivate: false,
        members: [],
      });
      await chatRoom.save();
    }

    if (!chatRoom.members.includes(username)) {
      chatRoom.members.push(username);
      await chatRoom.save();
    }

    socket.join(room);
    const activeUsers = io.sockets.adapter.rooms.get(room)?.size || 0;

    io.to(room).emit("message", {
      user: "System",
      text: `${username} has joined the room.`,
    });
    io.to(room).emit("update_active_users", activeUsers);
    console.log(`User ${username} joined room: ${room}`);
  });

  // Handling user messages
  socket.on("send_message", async (data) => {
    const { room, user, message } = data;

    const chatRoom = await ChatRoom.findOne({ roomName: room });
    if (chatRoom) {
      chatRoom.messages.push({ sender: user, content: message });
      await chatRoom.save();
    }

    io.to(room).emit("message", { user, text: message });

    // Start a new mystery
    if (message.startsWith("/npc mystery")) {
      const mystery = await generateAIStory();
      activeMysteries[room] = mystery;

      io.to(room).emit("message", {
        user: "NPC",
        text: `🕵️‍♂️ Mystery: ${mystery.mystery}`,
      });
      io.to(room).emit("message", {
        user: "NPC",
        text: `🔎 Suspects:\n 1️⃣ ${mystery.suspects[0]}\n 2️⃣ ${mystery.suspects[1]}\n 3️⃣ ${mystery.suspects[2]}`,
      });

      if (chatRoom) {
        chatRoom.messages.push({ sender: "NPC", content: mystery.mystery });
        chatRoom.messages.push({
          sender: "NPC",
          content: `🔎 Suspects: 1️⃣ ${mystery.suspects[0]}, 2️⃣ ${mystery.suspects[1]}, 3️⃣ ${mystery.suspects[2]}`,
        });
        await chatRoom.save();
      }
    }

    // User makes a guess
    if (message.startsWith("/npc guess")) {
      const guess = parseInt(message.split(" ")[2]) - 1;
      if (activeMysteries[room]) {
        if (guess === activeMysteries[room].culprit) {
          io.to(room).emit("message", {
            user: "NPC",
            text: `🎉 Correct! ${activeMysteries[room].answer}`,
          });
          delete activeMysteries[room]; // Reset the mystery
        } else {
          io.to(room).emit("message", {
            user: "NPC",
            text: "❌ Wrong guess! Try again!",
          });
        }
      } else {
        io.to(room).emit("message", {
          user: "NPC",
          text: "There's no active mystery! Start one with /npc mystery.",
        });
      }
    }

    // Reveal the answer
    if (message.startsWith("/npc answer")) {
      if (activeMysteries[room]) {
        io.to(room).emit("message", {
          user: "NPC",
          text: `📢 The answer is: ${activeMysteries[room].answer}`,
        });
        delete activeMysteries[room]; // Reset mystery after revealing answer
      } else {
        io.to(room).emit("message", {
          user: "NPC",
          text: "There's no active mystery! Start one with /npc mystery.",
        });
      }
    }
  });

  // Handle user leaving
  socket.on("disconnecting", () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("message", {
          user: "System",
          text: "A user has left the room.",
        });

        const activeUsers = (io.sockets.adapter.rooms.get(room)?.size || 1) - 1;
        io.to(room).emit("update_active_users", activeUsers);
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
