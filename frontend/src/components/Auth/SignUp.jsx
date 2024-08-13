import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      // Sign Up with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // sending user data to the backend
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        console.log("User registered with backend and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to register user with backend");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { displayName, email } = userCredential.user;

      // sending Google user data to the backend
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: displayName, email, password: null }), // Password is null for Google users
      });

      if (response.ok) {
        console.log("User registered with backend via Google and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to register Google user with backend");
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailSignup}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up with Email</button>
      </form>
      <button onClick={handleGoogleSignup}>Sign Up with Google</button>
    </div>
  );
};

export default SignUp;
