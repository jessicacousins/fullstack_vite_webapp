import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";

const NavBar = () => {
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
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;