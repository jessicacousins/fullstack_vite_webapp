import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
// import ColorfulParticleBackground from "../ColorfulParticleBackground";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/home");

      await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      setError("Failed to log in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { email } = userCredential.user;

      navigate("/home");

      await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      setError("Failed to log in with Google. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    // Step 1: Check if the email exists in MongoDB
    try {
      const response = await fetch("/api/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        // Step 2: If email exists, send the password reset email via Firebase
        await sendPasswordResetEmail(auth, email);
        setResetMessage("Password reset email sent! Check your inbox.");
      } else {
        setError("This email is not registered in our system.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container-login">
      {/* <ColorfulParticleBackground /> */}
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

      {/* Add a button for password reset */}
      <button
        type="button"
        className="reset-password-button"
        onClick={handlePasswordReset}
      >
        Forgot Password?
      </button>

      {resetMessage && <p className="reset-message">{resetMessage}</p>}
    </div>
  );
};

export default Login;
