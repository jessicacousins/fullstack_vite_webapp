import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  return (
    <nav>
      <ul>
        {/* If user is not logged in, show Login and SignUp links */}
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        ) : (
          <>
            {/* If user is logged in, show Home, Profile, Blog, and Logout */}
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/shopping">Shopping</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            {/* Search bar here */}
            <li>
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
