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

    // sentiment analysis on the comment here
    const sentimentAnalysis = await analyzeSentiment(body);

    // content moderation on the comment here
    const moderationResult = await moderateContent(body);
    const isFlagged = moderationResult?.flagged || false;

    const newComment = {
      body,
      date: new Date(),
      user,
      sentimentAnalysis,
      isFlagged, // track flagged status for admin review
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

// Toggle Like a blog post
router.post("/:id/like", async (req, res) => {
  const userId = req.body.userId;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog post not found" });

    if (blog.likedBy.includes(userId)) {
      blog.likes -= 1;
      blog.likedBy = blog.likedBy.filter((id) => id !== userId);
    } else {
      blog.likes += 1;
      blog.likedBy.push(userId);
      blog.dislikedBy = blog.dislikedBy.filter((id) => id !== userId);
      if (blog.dislikedBy.includes(userId)) blog.dislikes -= 1;
    }
    await blog.save();
    res.json({ likes: blog.likes, dislikes: blog.dislikes });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).send("Server error");
  }
});

// Toggle Dislike a blog post
router.post("/:id/dislike", async (req, res) => {
  const userId = req.body.userId;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog post not found" });

    if (blog.dislikedBy.includes(userId)) {
      blog.dislikes -= 1;
      blog.dislikedBy = blog.dislikedBy.filter((id) => id !== userId);
    } else {
      blog.dislikes += 1;
      blog.dislikedBy.push(userId);

      blog.likedBy = blog.likedBy.filter((id) => id !== userId);
      if (blog.likedBy.includes(userId)) blog.likes -= 1;
    }
    await blog.save();
    res.json({ likes: blog.likes, dislikes: blog.dislikes });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    res.status(500).send("Server error");
  }
});

// Toggle Like a comment
router.post("/:postId/comments/:commentId/like", async (req, res) => {
  const userId = req.body.userId;

  try {
    const blog = await Blog.findById(req.params.postId);
    if (!blog) return res.status(404).json({ msg: "Blog post not found" });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    if (comment.likedBy.includes(userId)) {
      comment.likes -= 1;
      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
    } else {
      comment.likes += 1;
      comment.likedBy.push(userId);

      comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
      if (comment.dislikedBy.includes(userId)) comment.dislikes -= 1;
    }
    await blog.save();
    res.json({ likes: comment.likes, dislikes: comment.dislikes });
  } catch (error) {
    console.error("Error toggling like on comment:", error);
    res.status(500).send("Server error");
  }
});

// Toggle Dislike a comment
router.post("/:postId/comments/:commentId/dislike", async (req, res) => {
  const userId = req.body.userId;

  try {
    const blog = await Blog.findById(req.params.postId);
    if (!blog) return res.status(404).json({ msg: "Blog post not found" });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    if (comment.dislikedBy.includes(userId)) {
      comment.dislikes -= 1;
      comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
    } else {
      comment.dislikes += 1;
      comment.dislikedBy.push(userId);

      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      if (comment.likedBy.includes(userId)) comment.likes -= 1;
    }
    await blog.save();
    res.json({ likes: comment.likes, dislikes: comment.dislikes });
  } catch (error) {
    console.error("Error toggling dislike on comment:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
