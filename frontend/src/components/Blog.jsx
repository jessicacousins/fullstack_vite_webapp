import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import * as THREE from "three";

const Blog = ({ searchQuery, onSearchResults }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const mountRef = useRef(null);
  const rendererRef = useRef(null); // Store the renderer here

  // Fetch posts
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

  // Setup Three.js animation for background (Particle effect)
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Store the renderer

    // Create particle effect
    const particlesCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3); // x, y, z for each particle

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // Random positions
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 2;

    const animate = function () {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.000001;
      particles.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div ref={mountRef} style={styles.canvasContainer}></div>
      <h1 style={styles.heading}>Blog Posts</h1>
      {user && (
        <Link to="/create-blog" style={styles.createButton}>
          Create New Blog Post
        </Link>
      )}
      <div style={styles.postContainer}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post._id}
              style={index % 2 === 0 ? styles.postLeft : styles.postRight}
            >
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
          ))
        ) : (
          <p>No posts match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    padding: "20px",
    textAlign: "center",
    overflow: "hidden",
  },
  canvasContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.6, // Subtle effect
  },
  heading: { fontSize: "2.5rem", marginBottom: "20px" },
  postContainer: { display: "grid", gap: "20px" },
  postLeft: {
    background: "#333",
    padding: "20px",
    borderRadius: "8px",
    animation: "slideInLeft 1s ease-out forwards",
  },
  postRight: {
    background: "#333",
    padding: "20px",
    borderRadius: "8px",
    animation: "slideInRight 1s ease-out forwards",
  },
  createButton: { marginBottom: "20px", display: "inline-block" },
  deleteButton: { color: "red" },
};

export default Blog;
