import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import ColorfulParticleBackground from "../ColorfulParticleBackground";
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
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [error, setError] = useState(null);
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
      const { displayName, email, uid: googleUID } = userCredential.user;

      // Check if additional data like DOB is needed
      if (!dob || !policyAccepted) {
        setError("Date of birth and privacy agreement are required.");
        return;
      }

      // Prepare the user object for the backend
      const userData = {
        firstName: displayName ? displayName.split(" ")[0] : "",
        lastName: displayName ? displayName.split(" ")[1] : "",
        email,
        password: null, // No password for Google signups
        phone,
        bio,
        photoURL,
        dob, // Collected from form or user input
        googleUID,
        policyAccepted,
      };

      // Send the user data to the backend
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User registered with backend via Google");
        navigate("/home");
      } else {
        setError("Failed to register Google user with backend.");
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  const handlePolicyAcceptance = () => {
    setPolicyAccepted(true);
  };

  return (
    <div className="container-signup">
      {/* <ColorfulParticleBackground /> */}
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
            onChange={handlePolicyAcceptance}
          />
          <label>
            I have read and agree to the{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              Privacy Policy
            </span>
          </label>
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up with Email</button>
      </form>

      {/* Add Google Signup button */}
      <button className="google-button" onClick={handleGoogleSignup}>
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
