import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts for sentiment analysis overview
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    // Fetch flagged comments for moderation
    const fetchFlaggedComments = async () => {
      try {
        const response = await axios.get("/api/blogs/flagged-comments");
        setFlaggedComments(response.data);
      } catch (error) {
        console.error("Error fetching flagged comments:", error);
      }
    };

    // Run both fetch functions
    fetchPosts();
    fetchFlaggedComments();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Flagged Comments Section */}
      <div className="flagged-comments-section">
        <h2>Flagged Comments for Review</h2>
        {flaggedComments.length > 0 ? (
          flaggedComments.map((comment) => (
            <div key={comment.commentId} className="flagged-comment-card">
              <p>
                <strong>Comment:</strong> {comment.comment}
              </p>
              <p>
                <strong>Posted by:</strong> {comment.user}
              </p>
              <p>
                <strong>Categories Flagged:</strong>
                <ul>
                  {Object.entries(comment.categories).map(
                    ([category, flagged]) =>
                      flagged && <li key={category}>{category}</li>
                  )}
                </ul>
              </p>
              <div className="sentiment-analysis">
                <p>
                  <strong>Positive:</strong>{" "}
                  {comment.sentiment?.positiveProbability?.toFixed(2) || "N/A"}
                </p>
                <p>
                  <strong>Neutral:</strong>{" "}
                  {comment.sentiment?.neutralProbability?.toFixed(2) || "N/A"}
                </p>
                <p>
                  <strong>Negative:</strong>{" "}
                  {comment.sentiment?.negativeProbability?.toFixed(2) || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No flagged comments to review.</p>
        )}
      </div>

      {/* Sentiment Analysis Overview Section */}
      <div className="posts-overview">
        <h2>Posts with Sentiment Analysis</h2>
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
                    {comment.sentimentAnalysis?.sentiment || "No data"}
                  </p>
                  <div className="sentiment-probabilities">
                    <p>
                      Positive:{" "}
                      {comment.sentimentAnalysis?.positiveProbability.toFixed(
                        2
                      )}
                    </p>
                    <p>
                      Neutral:{" "}
                      {comment.sentimentAnalysis?.neutralProbability.toFixed(2)}
                    </p>
                    <p>
                      Negative:{" "}
                      {comment.sentimentAnalysis?.negativeProbability.toFixed(
                        2
                      )}
                    </p>
                  </div>
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
