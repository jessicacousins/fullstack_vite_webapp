import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes, FaShoppingCart, FaSearch } from "react-icons/fa";
import "./NavBar.css";

const NavBar = ({ onSearch, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const navRef = useRef();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => navigate("/login"))
      .catch((error) => console.error("Error logging out:", error));
  };

  const handleSearchChange = (e) => onSearch(e.target.value);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar dark-mode" ref={navRef}>
        <div className="navbar-header">
          <h1 className="navbar-brand">JMC App</h1>
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className={`navbar-list ${isMobileMenuOpen ? "open" : ""}`}>
          {/* Main Pages */}
          <li>
            <NavLink to="/home" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMobileMenu}>
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" onClick={closeMobileMenu}>
              Profile
            </NavLink>
          </li>

          {/* Categories Dropdown */}
          <li>
            <span className="dropdown-title">Categories</span>
            <ul className="dropdown">
              <li>
                <NavLink to="/us-history-facts" onClick={closeMobileMenu}>
                  Food Recipe Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/food-recipe" onClick={closeMobileMenu}>
                  USA Facts Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/world-culture" onClick={closeMobileMenu}>
                  World Culture Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={closeMobileMenu}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-dashboard" onClick={closeMobileMenu}>
                  Blog Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/games" onClick={closeMobileMenu}>
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/achievements" onClick={closeMobileMenu}>
                  Achievements
                </NavLink>
              </li>
              <li>
                <NavLink to="/soundboard" onClick={closeMobileMenu}>
                  Soundboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/pixel-art-maker" onClick={closeMobileMenu}>
                  Pixel Art Maker
                </NavLink>
              </li>
              <li>
                <NavLink to="/zen-breathing" onClick={closeMobileMenu}>
                  Zen Breathing
                </NavLink>
              </li>
              <li>
                <NavLink to="/med-tracking" onClick={closeMobileMenu}>
                  Med Tracking
                </NavLink>
              </li>

              <li>
                <NavLink to="/multiplayer-quest" onClick={closeMobileMenu}>
                  NPC Chatrooms
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Professional Tools */}

          <li>
            <span className="dropdown-title">Professional</span>
            <ul className="dropdown">
              <li>
                <NavLink to="/resume-builder" onClick={closeMobileMenu}>
                  Resume Builder
                </NavLink>
              </li>
              <li>
                <NavLink to="/wow-character" onClick={closeMobileMenu}>
                  World of Warcraft Character
                </NavLink>
              </li>
              <li>
                <NavLink to="/test-trainings" onClick={closeMobileMenu}>
                  Trainings
                </NavLink>
              </li>
              <li>
                <NavLink to="/customers" onClick={closeMobileMenu}>
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink to="/invoices" onClick={closeMobileMenu}>
                  Invoices
                </NavLink>
              </li>
              <li>
                <NavLink to="/billing-dashboard" onClick={closeMobileMenu}>
                  Financial Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/timecard" onClick={closeMobileMenu}>
                  Timecard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-timecards" onClick={closeMobileMenu}>
                  Admin Timecards
                </NavLink>
              </li>
              <li>
                <NavLink to="/healthcare-calendar" onClick={closeMobileMenu}>
                  Healthcare Activity Calendar
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Tools Dropdown */}
          <li>
            <span className="dropdown-title">Tools</span>
            <ul className="dropdown">
              <li>
                <NavLink to="/fileconverter" onClick={closeMobileMenu}>
                  File Converter
                </NavLink>
              </li>
              <li>
                <NavLink to="/typing-speed-test" onClick={closeMobileMenu}>
                  Typing Speed Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/doodle-classifier" onClick={closeMobileMenu}>
                  Doodle Classifier
                </NavLink>
              </li>

              <li>
                <NavLink to="/passwordgenerator" onClick={closeMobileMenu}>
                  Password Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/imageeditor" onClick={closeMobileMenu}>
                  Image Editor
                </NavLink>
              </li>
              <li>
                <NavLink to="/unitconverter" onClick={closeMobileMenu}>
                  Unit Converter
                </NavLink>
              </li>
              <li>
                <NavLink to="/colorpicker" onClick={closeMobileMenu}>
                  Color Picker
                </NavLink>
              </li>
              <li>
                <NavLink to="/reaction-speed-test" onClick={closeMobileMenu}>
                  Reaction Speed Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/time-zone-converter" onClick={closeMobileMenu}>
                  Time Zone Converter
                </NavLink>
              </li>
              <li>
                <NavLink to="/poll-creator" onClick={closeMobileMenu}>
                  Poll Creator
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Productivity Tools */}
          <li>
            <span className="dropdown-title">Productivity</span>
            <ul className="dropdown">
              <li>
                <NavLink to="/mood-tracker" onClick={closeMobileMenu}>
                  Mood Tracker
                </NavLink>
              </li>
              <li>
                <NavLink to="/flashcard-study-game" onClick={closeMobileMenu}>
                  Flashcard Study Game
                </NavLink>
              </li>

              <li>
                <NavLink to="/calculator" onClick={closeMobileMenu}>
                  Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/pomodoro-timer" onClick={closeMobileMenu}>
                  Pomodoro Timer
                </NavLink>
              </li>
              <li>
                <NavLink to="/payroll-date" onClick={closeMobileMenu}>
                  Payroll Date
                </NavLink>
              </li>
              <li>
                <NavLink to="/payroll-admin" onClick={closeMobileMenu}>
                  God Tier Payroll Admin
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Admin Links */}
          {user?.role === "god" && (
            <li>
              <NavLink to="/payroll-admin" onClick={closeMobileMenu}>
                Payroll Admin
              </NavLink>
            </li>
          )}

          {/* Shopping */}
          <li>
            <NavLink to="/checkout" onClick={closeMobileMenu}>
              Checkout
            </NavLink>
          </li>
          <li>
            <NavLink to="/shopping" onClick={closeMobileMenu}>
              Shopping
            </NavLink>
          </li>

          {/* Cart Icon */}
          <li className="cart-link" onClick={closeMobileMenu}>
            <NavLink to="/cart">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </NavLink>
          </li>

          {/* Camera Feature */}
          <li>
            <NavLink to="/selfie-camera" onClick={closeMobileMenu}>
              Camera
            </NavLink>
          </li>

          {/* Logout */}
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="search-bar sticky-search-bar">
        <input
          type="text"
          placeholder="Search Blog Posts..."
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default NavBar;
