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
import BlackjackGame from "./components/BlackjackGame";
import MemoryGame from "./components/MemoryGame";
import MemoryGameStats from "./components/MemoryGameStats";
import StatsDashboard from "./components/StatsDashboard";
import SimonSaysGame from "./components/SimonSaysGame";
import SimonSaysStats from "./components/SimonSaysStats";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Chatbot from "./components/Chatbot";
import AdminDashboard from "./components/AdminDashboard";
import OrderSuccess from "./components/OrderSuccess";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
  };

  const updateCartQuantity = (index, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = useNavigate();

  // Handle search function
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());

    // If the search query is not empty, navigate the user to the Blog page
    if (query.trim()) {
      proceedToCheckout("/blog");
    }
  };

  // Handle setting search results found or not
  const handleSearchResults = (hasResults) => {
    setSearchResultsFound(hasResults);
  };

  const clearCart = () => {
    setCartItems([]);
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
        <Route path="/blackjack" element={<BlackjackGame />} />
        <Route path="/blackjack-stats" element={<StatsDashboard />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/memory-game-stats" element={<MemoryGameStats />} />
        <Route path="/simon-says" element={<SimonSaysGame />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/shopping" element={<Shopping addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
              setCartItems={setCartItems}
              proceedToCheckout={() => proceedToCheckout("/checkout")}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} clearCart={clearCart} />}
        />

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

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
