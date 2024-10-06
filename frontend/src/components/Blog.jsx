import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get("/api/blogs").then((response) => setPosts(response.data));
  }, []);

  const handleCommentSubmit = async (postId) => {
    try {
      await axios.post(`/api/blogs/${postId}/comment`, {
        body: comment,
        user: user.email,
      });
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

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

            <h3>Comments</h3>
            <div>
              {post.comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment.body}</p>
                  <p>
                    By {comment.user} on{" "}
                    {new Date(comment.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {user && (
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={() => handleCommentSubmit(post._id)}>
                  Submit Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  heading: { fontSize: "2.5rem", marginBottom: "20px" },
  postContainer: { display: "grid", gap: "20px" },
  post: { background: "#333", padding: "20px", borderRadius: "8px" },
  createButton: { marginBottom: "20px", display: "inline-block" },
  deleteButton: { color: "red" },
};

export default Blog;
