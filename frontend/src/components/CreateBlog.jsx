import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; 

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content, author: user.email };

    axios.post("/api/blogs", postData).then(() => {
      navigate("/blog");
    });
  };

  return (
    <div className="create-blog-container">
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
  );
};

export default CreateBlog;
