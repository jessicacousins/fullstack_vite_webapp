import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaComment, FaExpand, FaHeart, FaThumbsDown } from "react-icons/fa";
import "./Blog.css";
import GlobeCanvas from "./WireframeGlobe";

const Blog = ({ searchQuery, onSearchResults }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  // Fetch posts
  useEffect(() => {
    axios.get("/api/blogs").then((response) => setPosts(response.data));
  }, []);

  const handleCommentSubmit = async (postId) => {
    const comment = comments[postId];
    if (!comment || !comment.trim()) return;

    try {
      await axios.post(`/api/blogs/${postId}/comment`, {
        body: comment,
        user: user.email,
      });
      const response = await axios.get("/api/blogs");
      setPosts(response.data);
      setComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  // Toggle read more
  const toggleReadMore = (postId) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Toggle comments view
  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Filter posts based on the search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Notify the App.js if there are results or not
  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(filteredPosts.length > 0);
    }
  }, [filteredPosts, onSearchResults]);

  // Toggle like for a post
  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(`/api/blogs/${postId}/like`, {
        userId: user.uid,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like on post:", error);
    }
  };

  // Toggle dislike for a post
  const handleDislikePost = async (postId) => {
    try {
      const response = await axios.post(`/api/blogs/${postId}/dislike`, {
        userId: user.uid,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling dislike on post:", error);
    }
  };

  // Toggle like for a comment
  const handleLikeComment = async (postId, commentId) => {
    try {
      const response = await axios.post(
        `/api/blogs/${postId}/comments/${commentId}/like`,
        { userId: user.uid }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? {
                        ...comment,
                        likes: response.data.likes,
                        dislikes: response.data.dislikes,
                      }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like on comment:", error);
    }
  };

  // Toggle dislike for a comment
  const handleDislikeComment = async (postId, commentId) => {
    try {
      const response = await axios.post(
        `/api/blogs/${postId}/comments/${commentId}/dislike`,
        { userId: user.uid }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? {
                        ...comment,
                        likes: response.data.likes,
                        dislikes: response.data.dislikes,
                      }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling dislike on comment:", error);
    }
  };

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <div className="hero-section">Blog – Discover, Engage, and Connect</div>

      {/* Globe NASA here */}
      <GlobeCanvas />

      {/* <h1 className="blog-heading">Blog Posts</h1> */}

      {/* <h1 className="blog-heading glitch-heading">Blog Posts</h1> */}
      <div className="info-blog-card">
        <h1 className="info-blog-title">Community Blog Posts</h1>
        <p className="info-blog-intro">
          Welcome to the Community Blog Posts section! Here, users share their
          thoughts, ideas, and experiences through engaging blog posts. Dive
          into the rich content created by our community, and don't hesitate to
          join the conversation.
        </p>
        <p className="info-blog-interactions">
          You can <strong>like</strong> and <strong>dislike</strong> blog posts
          and comments to express your opinions, or leave a thoughtful comment
          to contribute to the discussion. Your feedback and participation help
          make this space more vibrant and interactive. Share the love or spark
          a debate, it's all part of building our community!
        </p>
      </div>

      {user && (
        // <Link to="/create-blog" className="create-blog-button">
        //   Create New Blog Post
        // </Link>
        <div className="info-blog-ai-card">
          <h1 className="info-blog-ai-title">
            Create a Blog with AI Assistance
          </h1>
          <p className="info-blog-ai-intro">
            Ready to share your story but need a little help getting started?
            The blog creation tool offers{" "}
            <strong>OpenAI-powered assistance</strong> to help you craft
            engaging posts. Whether you want to write from scratch or refine
            your thoughts, the AI editor is here to guide you every step of the
            way.
          </p>
          <p className="info-blog-ai-usage">
            Tap into the power of AI to generate ideas, improve your drafts, or
            explore creative writing styles. Start expressing yourself
            effortlessly and make your mark in the community!
          </p>
          {user && (
            <Link to="/create-blog" className="create-blog-button">
              Start Your Blog Now
            </Link>
          )}
        </div>
      )}
      <div className="styled-divider">________________________________________________________________________</div>

      <h3 className="blog-intro-title">Explore Community Posts</h3>
      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isExpanded = expandedPosts.includes(post._id);
            const areCommentsVisible = showComments[post._id];
            return (
              <div key={post._id} className="post-card1">
                <h2 className="post-title">{post.title}</h2>
                <p className={`post-content ${isExpanded ? "" : "truncated"}`}>
                  {post.content}
                </p>
                {post.content.length > 200 && (
                  <span
                    className="read-more"
                    onClick={() => toggleReadMore(post._id)}
                  >
                    {isExpanded ? " Show Less" : " Read More"}
                  </span>
                )}
                <p className="post-author">
                  By <span className="author-name">{post.author}</span>
                </p>
                <p className="post-date">
                  {new Date(post.createdAt).toLocaleString()}
                </p>

                {/* Like and Dislike buttons for the post */}
                <div className="like-dislike-buttons">
                  <button
                    onClick={() => handleLikePost(post._id)}
                    className="like-button"
                    title="Like"
                  >
                    <FaHeart /> {post.likes}
                  </button>
                  <button
                    onClick={() => handleDislikePost(post._id)}
                    className="dislike-button"
                    title="Dislike"
                  >
                    <FaThumbsDown /> {post.dislikes}
                  </button>
                </div>

                <div className="post-actions">
                  <FaComment
                    className="icon-button"
                    onClick={() => toggleComments(post._id)}
                    title="View Comments"
                  />
                  <FaExpand
                    className="icon-button"
                    onClick={() => toggleReadMore(post._id)}
                    title="Expand Post"
                  />
                </div>

                {areCommentsVisible && (
                  <div className="comments-section">
                    <h3 className="comments-heading">Comments</h3>
                    {post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment._id} className="comment">
                          <p className="comment-body">{comment.body}</p>
                          <p className="comment-user">
                            By{" "}
                            <span className="comment-author">
                              {comment.user}
                            </span>{" "}
                            on {new Date(comment.date).toLocaleString()}
                          </p>
                          <div className="like-dislike-buttons">
                            <button
                              onClick={() =>
                                handleLikeComment(post._id, comment._id)
                              }
                              className="like-button"
                            >
                              <FaHeart /> {comment.likes}
                            </button>
                            <button
                              onClick={() =>
                                handleDislikeComment(post._id, comment._id)
                              }
                              className="dislike-button"
                            >
                              <FaThumbsDown /> {comment.dislikes}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-comments">No comments yet.</p>
                    )}
                    {user && (
                      <div className="comment-form">
                        <textarea
                          value={comments[post._id] || ""}
                          onChange={(e) =>
                            setComments({
                              ...comments,
                              [post._id]: e.target.value,
                            })
                          }
                          placeholder="Write a comment..."
                          className="comment-textarea"
                          required
                        />
                        <button
                          onClick={() => handleCommentSubmit(post._id)}
                          className="submit-comment-button"
                        >
                          Submit Comment
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-posts">No posts match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
