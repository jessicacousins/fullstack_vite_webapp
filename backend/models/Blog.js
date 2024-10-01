const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ body: String, date: Date, user: String }],
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
