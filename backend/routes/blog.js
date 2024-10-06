const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

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
    const newBlog = new Blog({
      title,
      content,
      author,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).send("Server error");
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

    blog.comments.push({ body, date: new Date(), user });
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
