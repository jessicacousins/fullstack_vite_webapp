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
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !dob) {
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

    const age = calculateAge(dob);
    if (age < 13) {
      setError("You must be 13 or older to register.");
      return false;
    }

    if (!policyAccepted) {
      setError("You must accept the Privacy Policy to continue.");
      return false;
    }

    return true;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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
          dob,
          policyAccepted: true,
        }),
      });

      if (response.ok) {
        console.log("User registered with backend and Firebase");
        navigate("/home");
      } else {
        console.error("Failed to register user with backend");
        setError("Failed to register user with backend.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email address is already in use by another account.");
      } else {
        setError("Failed to sign up. Please try again.");
      }
      console.error("Error signing up:", error);
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
        body: JSON.stringify({
          name: displayName,
          email,
          password: null,
          policyAccepted: true,
        }),
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

  const handlePolicyAcceptance = () => {
    setPolicyAccepted(true);
    setShowPolicy(false);
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
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <div>
          <input
            type="checkbox"
            checked={policyAccepted}
            onChange={() => setShowPolicy(true)}
          />
          <label>
            I have read and agree to the{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowPolicy(true)}
            >
              Privacy Policy
            </span>
          </label>
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up with Email</button>
      </form>

      {showPolicy && (
        <div className="policy-modal">
          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. This website collects the following
            data:
          </p>
          <ul>
            <li>Basic information such as name, email, phone number, etc.</li>
            <li>Google Analytics for traffic tracking</li>
            <li>Google AdSense for displaying advertisements</li>
            <li>Device information, IP address, browser type, etc.</li>
          </ul>
          <p>
            By signing up, you agree to the collection of this data for the
            purposes of providing our services, improving user experience, and
            delivering targeted advertisements.
          </p>
          <button onClick={handlePolicyAcceptance}>I Agree</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
