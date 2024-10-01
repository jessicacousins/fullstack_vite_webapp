import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs").then((response) => setPosts(response.data));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Blog Posts</h1>
      {user && (
        <Link to="/create-blog" style={styles.createButton}>
          Create New Blog Post
        </Link>
      )}
      <div style={styles.postContainer}>
        {posts.map((post) => (
          <div key={post._id} style={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By {post.author}</p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
            {user && user.email === post.author && (
              <div>
                <Link to={`/edit-blog/${post._id}`} style={styles.editButton}>
                  Edit
                </Link>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            )}
            {/* Comment this section until CommentSection is implemented */}
            {/* <CommentSection postId={post._id} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  axios.delete(`/api/blogs/${id}`).then(() => window.location.reload());
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  heading: { fontSize: "2.5rem", marginBottom: "20px" },
  postContainer: { display: "grid", gap: "20px" },
  post: { background: "#333", padding: "20px", borderRadius: "8px" },
  createButton: { marginBottom: "20px", display: "inline-block" },
  editButton: { marginRight: "10px" },
  deleteButton: { color: "red" },
};

export default Blog;
