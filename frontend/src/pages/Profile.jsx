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
  const [userComments, setUserComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
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

      fetchUserComments();
      fetchUserPosts();
      fetchBlackjackStats();
      fetchSimonSaysStats();
      fetchMemoryGameStats();
      fetchSnapQuestStats();
    }
  }, [user]);

  const fetchUserComments = async () => {
    try {
      const response = await axios.get(`/api/users/${user.email}/comments`);
      setUserComments(response.data);
    } catch (error) {
      console.error("Error fetching user comments:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`/api/users/${user.email}/posts`);
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

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

  const toggleShowComments = () => setShowComments(!showComments);
  const toggleShowPosts = () => setShowPosts(!showPosts);

  return (
    <div className="profile-page">
      <h2 className="main-title">Profile Page</h2>
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

          <div className="profile-welcome">
            <h2 className="profile-welcome-title">Welcome, {firstName}!</h2>
            <p className="profile-welcome-message">
              This is your personal profile page. Here you can view and edit
              your personal information, check your game stats, see your
              comments and posts, and manage your account settings.
            </p>
          </div>

          <p className="email">{email}</p>
          <p className="bio">{bio}</p>
          <input
            className="file-profile-pic"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>
      <form onSubmit={handleUpdate} className="profile-form">
        <h2 className="edit-title">Edit User Info</h2>
        <p className="profile-section-description">
          Update your personal information and customize your profile.
        </p>

        <p className="edit-info-input">First Name</p>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p class="edit-info-input">Last Name</p>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <p class="edit-info-input">Phone</p>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p class="edit-info-input">Bio</p>
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
        <h3 className="game-stats-title">User Game Stats</h3>
        <p className="profile-section-description">
          Track your progress and achievements across different games.
        </p>
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
      {/* User Comments Section */}
      <div className="user-comments-section">
        <h3 onClick={toggleShowComments} className="expandable-heading">
          Your Comments {showComments ? "▲" : "▼"}
        </h3>
        {showComments && userComments.length > 0
          ? userComments.map((comment, index) => (
              <div key={index} className="comment-card">
                <p>{comment.body}</p>
                <p>Blog Title: {comment.blogTitle}</p>
                <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                <div className="sentiment-analysis">
                  <p>Sentiment: {comment.sentiment?.sentiment || "N/A"}</p>
                  <p>
                    Positive:{" "}
                    {comment.sentiment?.positiveProbability?.toFixed(2)}
                  </p>
                  <p>
                    Neutral: {comment.sentiment?.neutralProbability?.toFixed(2)}
                  </p>
                  <p>
                    Negative:{" "}
                    {comment.sentiment?.negativeProbability?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          : showComments && <p>No comments available.</p>}
      </div>
      {/* User Posts Section */}
      <div className="user-posts-section">
        <h3 onClick={toggleShowPosts} className="expandable-heading">
          Your Blog Posts {showPosts ? "▲" : "▼"}
        </h3>
        {showPosts && userPosts.length > 0
          ? userPosts.map((post, index) => (
              <div key={index} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <p>Date: {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          : showPosts && <p>No blog posts available.</p>}
      </div>
      {/* Account Deletion Section */}
      <div className="account-deletion-section">
        <h3>Delete User Account:</h3>
        <p className="profile-warning-title"> WARNING</p>
        <p className="delete-user-info">
          Deleting your account will result in the permanent removal of most
          data associated with your account, and this action cannot be undone.
          However, certain information—such as purchase records, shipping
          addresses, comments, and blog posts—will be retained as required by
          law for legal and compliance purposes. This retained information will
          be securely stored and limited to what is strictly necessary. All
          other personal data will be permanently removed from our systems.
        </p>
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
