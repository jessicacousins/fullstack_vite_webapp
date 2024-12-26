import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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
import SnapQuestGame from "./components/SnapQuestGame";
import Achievements from "./components/Achievements";
import Soundboard from "./components/Soundboard";

import Customers from "./components/Billing/Customers";
import Invoices from "./components/Billing/Invoices";
import AdminBillingDashboard from "./components/Billing/AdminBillingDashboard";
import InvoicePaymentForm from "./components/Billing/InvoicePaymentForm";

import FileConverter from "./components/FileConverter";
import PasswordGenerator from "./components/PasswordGenerator";
import ImageEditor from "./components/ImageEditor";
import UnitConverter from "./components/UnitConverter";
import ColorPicker from "./components/ColorPicker";
import MoodTracker from "./components/MoodTracker";
import Timecard from "./components/Timecard";
import AdminTimecards from "./components/AdminTimecards";
import PomodoroTimer from "./components/PomodoroTimer";
import PayrollDateRangeCalculate from "./components/PayrollDateRangeCalculate";
import PayrollAdmin from "./components/PayrollAdmin";

import "./App.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    if (query.trim()) {
      proceedToCheckout("/blog");
    }
  };

  const handleSearchResults = (hasResults) => {
    setSearchResultsFound(hasResults);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AuthProvider>
      <NavBar onSearch={handleSearch} cartItemCount={cartItemCount} />
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
        <Route path="/snapquest" element={<SnapQuestGame />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/soundboard" element={<Soundboard />} />
        <Route path="/fileconverter" element={<FileConverter />} />
        <Route path="/passwordgenerator" element={<PasswordGenerator />} />
        <Route path="/imageeditor" element={<ImageEditor />} />
        <Route path="/unitconverter" element={<UnitConverter />} />
        <Route path="/colorpicker" element={<ColorPicker />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />;
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route
          path="/timecard"
          element={<Timecard employeeId="current-employee-id" />}
        />
        <Route path="/admin-timecards" element={<AdminTimecards />} />
        <Route path="/billing-dashboard" element={<AdminBillingDashboard />} />
        <Route
          path="/invoice-payment/:id"
          element={
            <Elements stripe={stripePromise}>
              <InvoicePaymentForm />
            </Elements>
          }
        />
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
              addToCart={addToCart}
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
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/payroll-date" element={<PayrollDateRangeCalculate />} />
        <Route path="/payroll-admin" element={<PayrollAdmin />} />
      </Routes>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
