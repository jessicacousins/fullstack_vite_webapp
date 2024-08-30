import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to My App</h1>
      <div style={styles.linkContainer}>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/signup" style={styles.link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "2rem",
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  link: {
    fontSize: "1.5rem",
    padding: "0.75rem 2rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    textDecoration: "none",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#0056b3",
  },
};

export default Welcome;
