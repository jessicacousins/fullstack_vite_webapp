const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model("Poll", PollSchema);
module.exports = Poll;
