import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

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

        {/* Blog Section */}
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

        {/* Games Section */}
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

        {/* Shopping Section */}
        <div className="feature-section">
          <Link to="/shopping" className="feature-link">
            <h3 className="feature-heading">🛍️ Shopping</h3>
          </Link>
          <p className="feature-text">
            Browse our store for exciting products. Add items to your cart and
            proceed to checkout with secure Stripe payment integration.
          </p>
        </div>

        {/* Checkout Section */}
        <div className="feature-section">
          <Link to="/checkout" className="feature-link">
            <h3 className="feature-heading">🛒 Checkout</h3>
          </Link>
          <p className="feature-text">
            Securely review and purchase items in your cart. Keep track of your
            transactions and payment details with ease.
          </p>
        </div>

        {/* News Section */}
        <div className="feature-section">
          <Link to="/about" className="feature-link">
            <h3 className="feature-heading">📰 News Feed</h3>
          </Link>
          <p className="feature-text">
            Stay up-to-date with real-time news and articles tailored to your
            interests.
          </p>
        </div>

        {/* Admin Dashboard */}
        <div className="feature-section">
          <Link to="/admin-dashboard" className="feature-link">
            <h3 className="feature-heading">📊 Blog Admin Dashboard</h3>
          </Link>
          <p className="feature-text">
            Manage blog posts, comments, and flagged content with powerful admin
            tools.
          </p>
        </div>

        {/* Achievements Section */}
        <div className="feature-section">
          <Link to="/achievements" className="feature-link">
            <h3 className="feature-heading">🏆 Achievements</h3>
          </Link>
          <p className="feature-text">
            Unlock achievements by participating in games, blogs, and other
            activities. Track your milestones and celebrate your progress!
          </p>
        </div>

        {/* Tools Section */}
        <div className="feature-section">
          <Link to="/fileconverter" className="feature-link">
            <h3 className="feature-heading">🛠️ Tools</h3>
          </Link>
          <p className="feature-text">
            Utilize tools like File Converter, Password Generator, Image Editor,
            Unit Converter, and Color Picker to boost your productivity.
          </p>
        </div>

        {/* Timecards Section */}
        <div className="feature-section">
          <Link to="/timecard" className="feature-link">
            <h3 className="feature-heading">⏱️ Timecards</h3>
          </Link>
          <p className="feature-text">
            Manage your working hours with the Timecard feature. Clock in, clock
            out, and view your logged work sessions.
          </p>
        </div>

        {/* Admin Timecards */}
        <div className="feature-section">
          <Link to="/admin-timecards" className="feature-link">
            <h3 className="feature-heading">🗂️ Admin Timecards</h3>
          </Link>
          <p className="feature-text">
            Admins can monitor employee timecards, manage clock-in/out logs, and
            track total work hours.
          </p>
        </div>

        {/* Profile Section */}
        <div className="feature-section">
          <Link to="/profile" className="feature-link">
            <h3 className="feature-heading">🔐 User Profile</h3>
          </Link>
          <p className="feature-text">
            Manage your account details, update your profile, and personalize
            your experience.
          </p>
        </div>

        {/* Mood Tracker */}
        <div className="feature-section">
          <Link to="/mood-tracker" className="feature-link">
            <h3 className="feature-heading">📅 Mood Tracker</h3>
          </Link>
          <p className="feature-text">
            Log and monitor your mood trends with our intuitive Mood Tracker
            tool.
          </p>
        </div>

        {/* Final Section */}
        <div className="home-button-container">
          <Link to="/profile" className="button-home">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
