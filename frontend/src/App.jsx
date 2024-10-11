import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import NavBar from "./components/Layout/NavBar";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import About from "./pages/About";
import Games from "./pages/Games";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const navigate = useNavigate();

  // Handle search function
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());

    // If the search query is not empty, navigate the user to the Blog page
    if (query.trim()) {
      navigate("/blog");
    }
  };

  // Handle setting search results found or not
  const handleSearchResults = (hasResults) => {
    setSearchResultsFound(hasResults);
  };

  return (
    <AuthProvider>
      <NavBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games" element={<Games />} />
        <Route
          path="/blog"
          element={
            <Blog
              searchQuery={searchQuery}
              onSearchResults={handleSearchResults}
            />
          }
        />
        <Route path="/create-blog" element={<CreateBlog />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
