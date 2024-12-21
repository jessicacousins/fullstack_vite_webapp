import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = ({ userName }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-heading">
          Welcome, {userName ? userName : "Friend"}!
        </h1>
        <p className="welcome-text">
          This space is yours to explore, create, and be inspired. Whether
          you're discovering something new or returning to dive deeper, our
          community is here to spark your imagination.
        </p>
        <p className="welcome-text">
          Explore the world of creativity, inspiration, and community. Sign up
          to unlock exclusive features or log in if you're already part of the
          journey.
        </p>

        <div className="cta-container">
          <Link to="/login" className="cta-button primary pulse">
            Login
          </Link>
          <Link to="/signup" className="cta-button primary pulse">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Image sections with placeholder images */}
      <div className="image-container-left">
        <img src="/placeHolder.png" alt="Ad placeholder" />
      </div>
      <div className="image-container-right">
        <img src="/placeholder2.png" alt="Ad placeholder" />
      </div>
    </div>
  );
};

export default Welcome;
