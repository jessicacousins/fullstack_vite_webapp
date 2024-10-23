import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false); // New state to track AI generation
  const [keywords, setKeywords] = useState(""); // New state for AI prompt keywords
  const navigate = useNavigate();

  // Submit blog post
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content, author: user.email };

    axios
      .post("/api/blogs", postData)
      .then(() => {
        navigate("/blog");
      })
      .catch((error) => {
        console.error("Error creating blog post:", error);
      });
  };

  // Generate content using OpenAI API
  const generateContent = async () => {
    if (!keywords.trim()) return; // Prevent empty AI generation requests
    setAiGenerating(true);

    try {
      const response = await axios.post("/api/blogs/generate", {
        prompt: keywords,
      });
      setContent(response.data.content); // Set AI-generated content
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <h1 className="create-blog-heading">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit} className="create-blog-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="create-blog-input"
            required
          />

          {/* AI Content Generation Section */}
          <div className="ai-content-generator">
            <input
              type="text"
              placeholder="Enter keywords for AI-generated content"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="ai-keywords-input"
            />
            <button
              type="button"
              className="generate-content-button"
              onClick={generateContent}
              disabled={aiGenerating}
            >
              {aiGenerating ? "Generating..." : "Generate Content"}
            </button>
          </div>

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="create-blog-textarea"
            required
          />
          <button type="submit" className="create-blog-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
