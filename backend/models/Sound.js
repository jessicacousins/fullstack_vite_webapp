const mongoose = require("mongoose");

const SoundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  filePath: String,
});

module.exports = mongoose.model("Sound", SoundSchema);
