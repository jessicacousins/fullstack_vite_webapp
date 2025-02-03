
const express = require("express");
const router = express.Router();
const ChatRoom = require("../models/ChatRoom");

// GET all public chatrooms
router.get("/", async (req, res) => {
  try {
 
    const { roomName } = req.query;
    const query = { isPrivate: false };
    if (roomName) {
      query.roomName = roomName;
    }
    const publicChatRooms = await ChatRoom.find(query);
    res.json(publicChatRooms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new chatroom
router.post("/", async (req, res) => {
  const { roomName, isPrivate, members } = req.body;
  try {
    const newChatRoom = new ChatRoom({
      roomName,
      isPrivate: isPrivate || false,
      members: members || [],
    });
    await newChatRoom.save();
    res.status(201).json(newChatRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET details (including messages) for a chatroom
router.get("/:roomId", async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }
    res.json(chatRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new message into a chatroom (can be called from Socket.io)
router.post("/:roomId/messages", async (req, res) => {
  const { sender, content } = req.body;
  try {
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }
    const newMessage = { sender, content };
    chatRoom.messages.push(newMessage);
    await chatRoom.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: soft-delete (deactivate) a message
router.put("/:roomId/messages/:messageId/deactivate", async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }
    const message = chatRoom.messages.id(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    message.deactivated = true;
    message.content = "deactivated " + message.content;
    await chatRoom.save();
    res.json({ message: "Message deactivated", chatRoom });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: invite a user to a private chatroom
router.put("/:roomId/invite", async (req, res) => {
  const { email } = req.body;
  try {
    const chatRoom = await ChatRoom.findById(req.params.roomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }
    if (!chatRoom.members.includes(email)) {
      chatRoom.members.push(email);
      await chatRoom.save();
    }
    res.json({ message: "User invited", chatRoom });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
