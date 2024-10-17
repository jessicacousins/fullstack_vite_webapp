import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "./Home.css";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-page">
      <ParticleBackground />
      <div className="home-content">
        <h1 className="home-heading">Welcome to Your Homepage</h1>
        <p className="home-text">Hello, {user?.email}</p>
        <p className="home-description">
          This is your personalized dashboard. Here you can find the latest
          updates, personalized recommendations, and quick access to your
          profile. Stay tuned for more!
        </p>
        <div className="home-button-container">
          <button onClick={logout} className="button primary">
            Logout
          </button>
          <Link to="/profile" className="button secondary">
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
