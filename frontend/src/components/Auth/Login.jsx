import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!validateInputs()) {
      resetFields(); // Reset fields if validation fails
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Log the login event in the backend
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("User logged in with backend and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to log in user with backend");
        setError("Failed to log in user with backend.");
        resetFields();
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to log in. Please try again.");
      }
      console.error("Error logging in:", error);
      resetFields();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { email } = userCredential.user;

      // Log the login event in the backend
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: "" }),
      });

      if (response.ok) {
        console.log("User logged in with backend via Google and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to log in Google user with backend");
        setError("Failed to log in Google user with backend.");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login with Email</button>
      </form>
      <button className="google-button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
