const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { analyzeSentiment } = require("../services/sentimentService");
const { generateContent } = require("../services/contentGeneratorService");
const { moderateContent } = require("../services/moderationService");

// @route GET /api/blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route POST /api/blogs
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    // Perform content moderation
    const moderationResult = await moderateContent(content);
    const isFlagged = moderationResult?.flagged || false;

    const newBlog = new Blog({
      title,
      content,
      author,
      isFlagged,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route GET /api/blogs/flagged-comments
router.get("/flagged-comments", async (req, res) => {
  try {
    const blogs = await Blog.find({ "comments.isFlagged": true });
    const flaggedComments = [];

    blogs.forEach((blog) => {
      blog.comments.forEach((comment) => {
        if (comment.isFlagged) {
          flaggedComments.push({
            blogId: blog._id,
            blogTitle: blog.title,
            commentId: comment._id,
            comment: comment.body,
            user: comment.user,
            date: comment.date,
            sentiment: comment.sentimentAnalysis,
            categories: comment.sentimentAnalysis?.categories || {},
          });
        }
      });
    });

    res.json(flaggedComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flagged comments" });
  }
});

// @route DELETE /api/blogs/:id
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    await blog.remove();
    res.json({ msg: "Blog post removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route POST /api/blogs/:id/comment
router.post("/:id/comment", async (req, res) => {
  const { body, user } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    // Perform sentiment analysis on the comment
    const sentimentAnalysis = await analyzeSentiment(body);

    // Perform content moderation on the comment
    const moderationResult = await moderateContent(body);
    const isFlagged = moderationResult?.flagged || false;

    const newComment = {
      body,
      date: new Date(),
      user,
      sentimentAnalysis,
      isFlagged, // Track flagged status for admin review
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// AI generated blog posts from OpenAI
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const generatedContent = await generateContent(prompt);
    res.status(200).json({ content: generatedContent });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating blog content");
  }
});

module.exports = router;
