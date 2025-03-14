import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
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
import SelfieCamera from "./components/SelfieCamera";
import TicTacToeGame from "./components/TicTacToeGame";
import TypingSpeedTest from "./components/TypingSpeedTest";
import DoodleClassifier from "./components/DoodleClassifier";
import ReactionSpeedTest from "./components/ReactionSpeedTest";
import PixelArtMaker from "./components/PixelArtMaker";
import FlashcardStudyGame from "./components/FlashcardStudyGame";
import ResumeBuilder from "./components/ResumeBuilder";
import TimeZoneConverter from "./components/TimeZoneConverter";
import PollCreator from "./components/PollCreator";
import ZenBreathing from "./components/ZenBreathing";
import MedTracking from "./components/MedTracking";
import MonthlyCalendar from "./components/MonthlyCalendar";
import GradientGenerator from "./components/GradientGenerator";
import MultiplayerQuestGame from "./components/MultiplayerQuestGame";
import ChatRoomsList from "./components/ChatRoomsList";
import Calculator from "./components/Calculator";
import PatternDesigner from "./components/PatternDesigner";
import USHistoryFactsPage from "./components/USHistoryFactsPage";
import FoodRecipeGenerator from "./components/FoodRecipeGenerator";
import WorldCultureGenerator from "./components/WorldCultureGenerator";
import TrainingDashboard from "./components/Training/TrainingDashboard";
import TrainingModule from "./components/Training/TrainingModule";
import FinalTest from "./components/Training/FinalTest";
import CharacterLookup from "./components/CharacterLookup";
import Tesseract from "./components/Tesseract";
import Wormhole from "./components/Wormhole";
import DNA from "./components/DNA";
import PotatoExperiment from "./components/PotatoExperiment";
import LavaLamp from "./components/LavaLamp";

import "./App.css";

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:5000";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("message", (data) => {
      console.log("Live Message Received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => newSocket.disconnect();
  }, []);

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
        <Route path="/selfie-camera" element={<SelfieCamera />} />
        <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
        <Route path="/typing-speed-test" element={<TypingSpeedTest />} />
        <Route path="/doodle-classifier" element={<DoodleClassifier />} />
        <Route path="/reaction-speed-test" element={<ReactionSpeedTest />} />
        <Route path="/pixel-art-maker" element={<PixelArtMaker />} />
        <Route path="/flashcard-study-game" element={<FlashcardStudyGame />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/time-zone-converter" element={<TimeZoneConverter />} />
        <Route path="/poll-creator" element={<PollCreator />} />
        <Route path="/zen-breathing" element={<ZenBreathing />} />
        <Route path="/med-tracking" element={<MedTracking />} />
        <Route
          path="/healthcare-calendar"
          element={<MonthlyCalendar isAdmin={true} />}
        />
        <Route path="/gradient-generator" element={<GradientGenerator />} />
        <Route
          path="/multiplayer-quest"
          element={
            <MultiplayerQuestGame
              socket={socket}
              messages={messages}
              setMessages={setMessages}
            />
          }
        />
        <Route path="/chatrooms" element={<ChatRoomsList />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/pattern-designer" element={<PatternDesigner />} />
        <Route path="/us-history-facts" element={<USHistoryFactsPage />} />
        <Route path="/food-recipe" element={<FoodRecipeGenerator />} />
        <Route path="/world-culture" element={<WorldCultureGenerator />} />
        <Route path="/test-trainings" element={<TrainingDashboard />} />
        <Route path="/training/:trainingId" element={<TrainingModule />} />
        <Route path="/final-test/:trainingId" element={<FinalTest />} />
        <Route path="/wow-character" element={<CharacterLookup />} />
        <Route path="/tesseract" element={<Tesseract />} />
        <Route path="/wormhole" element={<Wormhole />} />
        <Route path="/dna" element={<DNA />} />
        <Route path="/potatoexperiment" element={<PotatoExperiment />} />
        <Route path="/lavalamp" element={<LavaLamp />} />
      </Routes>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
