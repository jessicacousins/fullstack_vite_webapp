const mongoose = require("mongoose");
const SentimentSchema = require("./Sentiment");

const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String, required: true },
  sentimentAnalysis: SentimentSchema, // Sentiment data for comments
  isFlagged: { type: Boolean, default: false }, // Flag for inappropriate comments
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  dislikedBy: [{ type: String }],
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema], // Comments associated with the blog
  isFlagged: { type: Boolean, default: false }, // Flag for inappropriate posts
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  dislikedBy: [{ type: String }],
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
