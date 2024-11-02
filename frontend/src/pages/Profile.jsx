import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [blackjackStats, setBlackjackStats] = useState(null);
  const [simonSaysStats, setSimonSaysStats] = useState(null);
  const [memoryGameStats, setMemoryGameStats] = useState(null);
  const [snapQuestStats, setSnapQuestStats] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/users/${user.email}`)
        .then((response) => {
          const { firstName, lastName, phone, bio, photoURL } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setPhone(phone || "");
          setBio(bio || "");
          setPhotoURL(photoURL || "");
          setEmail(user.email);
        })
        .catch((err) => setError("Failed to fetch user data"));

      fetchBlackjackStats();
      fetchSimonSaysStats();
      fetchMemoryGameStats();
      fetchSnapQuestStats();
    }
  }, [user]);

  const handleAccountDeletion = async () => {
    if (deleteConfirmation !== email) {
      setError("Email does not match.");
      return;
    }

    try {
      // Step 1: Delete user from MongoDB
      await axios.delete(`/api/users/${email}`);

      // Step 2: Delete user from Firebase Auth
      if (auth.currentUser) {
        await deleteUser(auth.currentUser); // `auth` is now referenced directly from Firebase config
      }

      // Step 3: Log out user and navigate away after deletion
      logout();
      setMessage("Account deleted successfully.");
      navigate("/"); // Redirect to Welcome view after deletion
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account.");
    }
  };
  const fetchBlackjackStats = async () => {
    try {
      const response = await axios.get(`/api/users/stats/${user.email}`);
      setBlackjackStats(response.data);
    } catch (error) {
      console.error("Error fetching Blackjack stats:", error);
    }
  };

  const fetchSimonSaysStats = async () => {
    try {
      const response = await axios.get(
        `/api/users/simon-says-stats/${user.email}`
      );
      setSimonSaysStats(response.data);
    } catch (error) {
      console.error("Error fetching Simon Says stats:", error);
    }
  };

  const fetchMemoryGameStats = async () => {
    try {
      const response = await axios.get(
        `/api/users/memory-game-stats/${user.email}`
      );
      setMemoryGameStats(response.data);
    } catch (error) {
      console.error("Error fetching Memory Game stats:", error);
    }
  };

  const fetchSnapQuestStats = async () => {
    try {
      const response = await axios.get(
        `/api/users/snapquest-stats/${user.email}`
      );
      setSnapQuestStats(response.data);
    } catch (error) {
      console.error("Error fetching SnapQuest stats:", error);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoURL(reader.result);
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
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={photoURL || "/default-avatar.png"}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h2>
            {firstName} {lastName}
          </h2>
          <p className="email">{email}</p>
          <p className="bio">{bio}</p>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>
      <form onSubmit={handleUpdate} className="profile-form">
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
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Update Profile</button>
      </form>

      <div className="game-stats-container">
        <h3>Game Stats</h3>

        {/* Blackjack Stats */}
        {blackjackStats ? (
          <div className="game-section">
            <h4>Blackjack</h4>
            <p>Games Played: {blackjackStats.gamesPlayed}</p>
            <p>Games Won: {blackjackStats.gamesWon}</p>
            <p>Games Lost: {blackjackStats.gamesLost}</p>
            <p>Highest Score: {blackjackStats.highestScore}</p>
            <p>Longest Winning Streak: {blackjackStats.longestWinningStreak}</p>
          </div>
        ) : (
          <p>Loading Blackjack stats...</p>
        )}

        {/* Simon Says Stats */}
        {simonSaysStats ? (
          <div className="game-section">
            <h4>Simon Says</h4>
            <p>Games Played: {simonSaysStats.gamesPlayed}</p>
            <p>Highest Level Reached: {simonSaysStats.highestLevel}</p>
            <ul>
              {simonSaysStats.gameRecords.map((record, index) => (
                <li key={index}>
                  Level Reached: {record.levelReached} | Date:{" "}
                  {new Date(record.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading Simon Says stats...</p>
        )}

        {/* Memory Game Stats */}
        {memoryGameStats ? (
          <div className="game-section">
            <h4>Memory Game</h4>
            <p>Games Played: {memoryGameStats.gamesPlayed}</p>
            <p>Best Score (Fewest Turns): {memoryGameStats.bestScore}</p>
            <ul>
              {memoryGameStats.scores.map((score, index) => (
                <li key={index}>
                  Turns: {score.turns} on{" "}
                  {new Date(score.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading Memory Game stats...</p>
        )}

        {/* SnapQuest Stats */}
        {snapQuestStats ? (
          <div className="game-section">
            <h4>SnapQuest</h4>
            <p>Highest Score: {snapQuestStats.highestScore}</p>
            <ul>
              {snapQuestStats.scores.map((score, index) => (
                <li key={index}>
                  Score: {score.score}, Challenges Completed:{" "}
                  {score.challengesCompleted} on{" "}
                  {new Date(score.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading SnapQuest stats...</p>
        )}
      </div>

      {/* Account Deletion Section */}
      <div className="account-deletion-section">
        <h3>Delete Account</h3>
        <button
          className="delete-button"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </div>

      {/* Modal for Account Deletion Confirmation */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Account Deletion</h2>
            <p>
              Are you sure you want to delete your account? This action is
              permanent, and all data associated with your account will be
              deleted. You will not be able to recover any information.
            </p>
            <p>Please type your email to confirm:</p>
            <input
              type="text"
              placeholder="Enter your email"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button
              className="confirm-delete-button"
              onClick={handleAccountDeletion}
            >
              Confirm Delete
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
