import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      // Fetch the user's profile data from the backend using their email
      axios
        .get(`/api/users/${user.email}`)
        .then((response) => {
          const { firstName, lastName, phone, bio, photoURL } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setPhone(phone || "");
          setBio(bio || "");
          setPhotoURL(photoURL || "");
          setEmail(user.email); // Assuming email comes from Firebase Auth
        })
        .catch((err) => {
          setError("Failed to fetch user data");
          console.error("Error fetching user profile:", err);
        });
    }
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid JPEG or PNG image.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!firstName || !lastName || !email) {
      setError("First name, last name, and email are required.");
      return;
    }

    try {
      const response = await axios.post("/api/users/update", {
        firstName,
        lastName,
        email,
        phone,
        bio,
        photoURL,
      });

      if (response.status === 200) {
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={true} // Don't allow changing email
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ ...styles.input, height: "80px" }}
        />
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handlePhotoUpload}
          style={styles.inputFile}
        />
        {photoURL && (
          <img src={photoURL} alt="Profile" style={styles.profilePic} />
        )}
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
  inputFile: {
    color: "#ffffff",
    marginBottom: "16px",
    border: "none",
    backgroundColor: "transparent",
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
