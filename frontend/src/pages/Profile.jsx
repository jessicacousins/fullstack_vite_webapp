import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic to update user info
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Profile Page</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
