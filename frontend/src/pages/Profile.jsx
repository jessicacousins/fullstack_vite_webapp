import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    try {
      await user.updateProfile({
        displayName: name,
        photoURL,
      });

      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, photoURL }),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile on backend.");
      }
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={styles.containerProfile}>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h1>Profile Page</h1>
        {photoURL && (
          <img src={photoURL} alt="Profile" style={styles.profilePic} />
        )}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true} // Disable email editing if user is logged in via Google
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <button type="submit" style={styles.button}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

const styles = {
  containerProfile: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#192734",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "auto",
    marginTop: "100px",
    color: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#22303c",
    color: "#ffffff",
    border: "1px solid #38444d",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#1da1f2",
    color: "#ffffff",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  error: {
    color: "#e0245e",
    fontSize: "14px",
    marginBottom: "16px",
  },
  success: {
    color: "#1da1f2",
    fontSize: "14px",
    marginBottom: "16px",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "16px",
  },
};

export default Profile;
