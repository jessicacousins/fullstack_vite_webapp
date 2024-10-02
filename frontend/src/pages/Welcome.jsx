import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome to [NAME_HERE]</h1>
        <p className="welcome-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Dolorem dolore magni
          perferendis iste ab incidunt nobis excepturi. Debitis voluptatibus,
          facilis numquam maxime ratione, reiciendis excepturi cum alias nisi
          optio at.
        </p>
        <p className="welcome-text">
          Explore the world of creativity, inspiration, and community. Sign up
          to unlock exclusive features or log in if you're already part of the
          journey.
        </p>
        <div className="cta-container">
          <Link to="/login" className="cta-button pulse">
            Login
          </Link>
          <Link to="/signup" className="cta-button pulse">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Image sections with placeholder images */}
      <div className="image-container-left">
        <img src="../../public/placeHolder.png" alt="Ad placeholder" />
      </div>
      <div className="image-container-right">
        <img src="../../public/placeHolder.png" alt="Ad placeholder" />
      </div>
    </div>
  );
};

export default Welcome;
