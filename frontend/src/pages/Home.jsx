import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Your Homepage</h1>
      <p style={styles.text}>Hello, {user?.email}</p>
      <p style={styles.description}>
        This is your personalized dashboard. Here you can find the latest
        updates, personalized recommendations, and quick access to your profile.
        Stay tuned for more!
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={logout} style={styles.button}>
          Logout
        </button>
        <Link to="/profile" style={{ ...styles.button, ...styles.link }}>
          Go to Profile
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
    fontFamily: "'Poppins', sans-serif",
    padding: "0 20px",
  },
  heading: {
    fontSize: "2.8rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#ffffff",
  },
  text: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#ddd",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
    textAlign: "center",
    maxWidth: "600px",
    color: "#bbb",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    fontSize: "1.25rem",
    padding: "0.75rem 2rem",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "background-color 0.3s ease",
  },
  link: {
    backgroundColor: "#28a745",
  },
};

export default Home;
