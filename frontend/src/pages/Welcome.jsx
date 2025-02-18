import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const CTAButton = ({ to, text }) => (
  <Link to={to} className="cta-button primary pulse">
    {text}
  </Link>
);

const Welcome = ({ userName }) => {
  return (
    <div className="welcome-container">
      <section className="welcome-content">
        <h1 className="welcome-heading">
          Welcome, {userName ? userName : "Traveler"}!
        </h1>
        <p className="welcome-text">
          Step into a realm of creativity, adventure, and innovation. Whether
          you are exploring new possibilities or fine-tuning your journey, we
          are here to support your vision.
        </p>

        <div className="cta-container">
          <CTAButton to="/login" text="Login" />
          <CTAButton to="/signup" text="Sign Up" />
        </div>
      </section>

      {/* Image Elements */}
      <aside className="image-container-left">
        <img src="/placeHolder.png" alt="Futuristic concept art" />
      </aside>
      <aside className="image-container-right">
        <img src="/placeholder2.png" alt="Futuristic cityscape" />
      </aside>
    </div>
  );
};

export default Welcome;
