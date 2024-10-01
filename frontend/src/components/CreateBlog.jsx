import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={styles.container}>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "1rem" },
  textarea: { padding: "10px", fontSize: "1rem", height: "200px" },
  button: { padding: "10px 20px", background: "#007bff", color: "#fff" },
};

export default CreateBlog;
