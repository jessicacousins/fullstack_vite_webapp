import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Home Page</h1>
      <p style={styles.text}>Welcome, {user?.email}</p>
      <button onClick={logout} style={styles.button}>
        Logout
      </button>
      <Link to="/profile" style={{ ...styles.button, ...styles.link }}>
        Go to Profile
      </Link>
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
  text: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
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
    textDecoration: "none",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  link: {
    backgroundColor: "#28a745",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Home;
