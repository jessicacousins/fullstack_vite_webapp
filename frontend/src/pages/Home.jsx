import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
};

export default Home;
