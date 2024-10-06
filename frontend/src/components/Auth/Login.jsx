import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import ColorfulParticleBackground from "../ColorfulParticleBackground";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      // Once Firebase login is successful, navigate to home
      navigate("/home");

      // Optional: Send login info to the backend for tracking user data in MongoDB
      await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Only send email, no password check needed
      });
    } catch (error) {
      setError("Failed to log in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { email } = userCredential.user;

      // Once Google login is successful, navigate to home
      navigate("/home");

      // Optional: Send login info to the backend for tracking user data in MongoDB
      await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Only send email for Google login
      });
    } catch (error) {
      setError("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="container-login">
      <ColorfulParticleBackground />
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
