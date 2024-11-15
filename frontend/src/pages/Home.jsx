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
        <h1 className="home-heading">Welcome to the Community</h1>
        <p className="home-text">Hello, {user?.email}</p>
        <p className="home-description">
          Explore the exciting features available to you. Here’s a quick
          overview of what you can do:
        </p>

        <div className="feature-section">
          <Link to="/blog" className="feature-link">
            <h3 className="feature-heading">🖊️ Blog Features</h3>
          </Link>
          <p className="feature-text">
            Create, edit, and manage your blog posts effortlessly. Share your
            thoughts with the community, comment on posts, and stay engaged with
            our dynamic blogging platform.
          </p>
        </div>

        <div className="feature-section">
          <Link to="/games" className="feature-link">
            <h3 className="feature-heading">🎮 Interactive Games</h3>
          </Link>
          <p className="feature-text">
            Enjoy a variety of games like Blackjack, Memory Matching, and Simon
            Says. Track your progress, check your stats, and challenge yourself
            to reach new milestones.
          </p>
        </div>

        <div className="feature-section">
          <Link to="/checkout" className="feature-link">
            <h3 className="feature-heading">🛒 Shopping and Checkout</h3>
          </Link>
          <p className="feature-text">
            Browse our store, add items to your cart, and enjoy secure payment
            processing with Stripe. View your transaction history and keep track
            of your purchases easily.
          </p>
        </div>

        <div className="feature-section">
          <Link to="/about" className="feature-link">
            <h3 className="feature-heading">📰 News Feed</h3>
          </Link>
          <p className="feature-text">
            Stay up-to-date with the latest news articles. Our platform
            integrates real-time news from trusted sources, giving you
            personalized and trending topics right at your fingertips.
          </p>
        </div>

        <div className="feature-section">
          <Link to="/profile" className="feature-link">
            <h3 className="feature-heading">
              🔐 User Account and Profile Management
            </h3>
          </Link>
          <p className="feature-text">
            Manage your profile details, update your personal information, and
            view your login history. Enjoy a secure and personalized experience
            tailored to you.
          </p>
        </div>

        <div className="home-button-container">
          {/* <button onClick={logout} className="button-home">
            Logout
          </button> */}
          <Link to="/profile" className="button-home">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
