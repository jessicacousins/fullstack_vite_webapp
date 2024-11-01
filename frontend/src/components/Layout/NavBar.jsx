import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
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

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(event.target.value);
    }
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-header">
        <h1 className="navbar-brand">Logo Name</h1>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={`navbar-list ${isMobileMenuOpen ? "open" : ""}`}>
        {!user ? (
          <div className="navbar-auth-links">
            <li onClick={closeMobileMenu}>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Login
              </NavLink>
            </li>
            <li onClick={closeMobileMenu}>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                SignUp
              </NavLink>
            </li>
          </div>
        ) : (
          <>
            {[
              { path: "/home", label: "Home" },
              { path: "/about", label: "News" },
              { path: "/profile", label: "Profile" },
              { path: "/blog", label: "Blog" },
              { path: "/games", label: "Games" },
              { path: "/checkout", label: "Checkout" },
              { path: "/shopping", label: "Shopping" },
              // { path: "/cart", label: "Cart" },
              { path: "/admin-dashboard", label: "Admin" },
            ].map((link) => (
              <li key={link.path} onClick={closeMobileMenu}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="cart-link" onClick={closeMobileMenu}>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </NavLink>
            </li>
            <li>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search Blog Posts..."
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button className="search-button" onClick={closeMobileMenu}>
                  🔍
                </button>
              </div>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
