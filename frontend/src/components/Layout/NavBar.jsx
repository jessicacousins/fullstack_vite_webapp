import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const navRef = useRef();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      {/* Render only in desktop view or when the menu is closed */}
      {!isMobileMenuOpen && (
        <div className="navbar-header">
          <h1 className="navbar-brand">Logo Name</h1>
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
        </div>
      )}

      {/* Render only in mobile view when the menu is open */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-header">
          <h1 className="navbar-brand">Logo Name</h1>
          <button className="hamburger-menu" onClick={closeMobileMenu}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* navbar links */}
      <ul className={`navbar-list ${isMobileMenuOpen ? "open" : ""}`}>
        {!user ? (
          <div className="navbar-auth-links">
            <li onClick={closeMobileMenu}>
              <NavLink to="/login" activeClassName="active-link">
                Login
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/signup" activeClassName="active-link">
                SignUp
              </NavLink>
            </li>
          </div>
        ) : (
          <>
            <li onClick={closeMobileMenu}>
              <NavLink to="/home" activeClassName="active-link">
                Home
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/about" activeClassName="active-link">
                News
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/profile" activeClassName="active-link">
                Profile
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/blog" activeClassName="active-link">
                Blog
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/games" activeClassName="active-link">
                Games
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/checkout" activeClassName="active-link">
                Checkout
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/shopping" activeClassName="active-link">
                Shopping
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/cart" activeClassName="active-link">
                Cart
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink to="/admin-dashboard" activeClassName="active-link">
                Admin
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button className="search-button" onClick={closeMobileMenu}>
                  🔍
                </button>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
