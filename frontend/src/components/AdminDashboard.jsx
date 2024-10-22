import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Sentiment Analysis Overview</h1>
      <div className="posts-overview">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h3>Comments Sentiment Overview:</h3>
            {post.comments.length > 0 ? (
              post.comments.map((comment, idx) => (
                <div key={idx} className="comment-sentiment">
                  <p>{comment.body}</p>
                  <p>
                    <strong>Sentiment: </strong>
                    {comment.sentimentAnalysis
                      ? comment.sentimentAnalysis.sentiment
                      : "No sentiment data available"}
                  </p>
                  {comment.sentimentAnalysis && (
                    <div className="sentiment-probabilities">
                      <p>Positive: {comment.sentimentAnalysis.positiveProbability.toFixed(2)}</p>
                      <p>Neutral: {comment.sentimentAnalysis.neutralProbability.toFixed(2)}</p>
                      <p>Negative: {comment.sentimentAnalysis.negativeProbability.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments available for this post.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
