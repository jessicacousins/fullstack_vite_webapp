const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  deactivated: { type: Boolean, default: false },
});

const ChatRoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },

  members: [{ type: String }],
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
