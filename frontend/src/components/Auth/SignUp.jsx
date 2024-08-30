import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, include lowercase and uppercase letters, a number, and a special character."
      );
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setBio("");
    setPhotoURL("");
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!validateInputs()) {
      resetFields(); // Reset fields if validation fails
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const displayName = `${firstName} ${lastName}`;
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
          bio,
          photoURL,
        }),
      });

      if (response.ok) {
        console.log("User registered with backend and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to register user with backend");
        setError("Failed to register user with backend.");
        resetFields();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email address is already in use by another account.");
      } else {
        setError("Failed to sign up. Please try again.");
      }
      console.error("Error signing up:", error);
      resetFields();
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { displayName, email } = userCredential.user;

      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: displayName, email, password: null }),
      });

      if (response.ok) {
        console.log("User registered with backend via Google and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to register Google user with backend");
        setError("Failed to register Google user with backend.");
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <div className="container-signup">
      <form onSubmit={handleEmailSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{
            marginBottom: "16px",
            padding: "12px",
            backgroundColor: "#22303c",
            color: "#ffffff",
            border: "1px solid #38444d",
            borderRadius: "4px",
          }}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up with Email</button>
      </form>
      <button className="google-button" onClick={handleGoogleSignup}>
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
