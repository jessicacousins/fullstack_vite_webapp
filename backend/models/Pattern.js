const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
  image: { type: String, required: true }, 
  shapes: { type: Array, required: true }, 
  background: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pattern", PatternSchema);
