import React, { useState } from "react";
import axios from "axios";
import "./CharacterLookup.css";

const CharacterLookup = () => {
  const [realm, setRealm] = useState("");
  const [name, setName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState("");

  const fetchCharacterData = async () => {
    setError("");
    setCharacterData(null);

    if (!realm || !name) {
      setError("Please enter both realm and character name.");
      return;
    }

    try {
      const response = await axios.get(`/api/wow/character/${realm}/${name}`);
      setCharacterData(response.data);
    } catch (error) {
      console.error("Error fetching character:", error.response?.data);
      setError(
        "Failed to fetch character data. Ensure the details are correct."
      );
    }
  };

  return (
    <div className="character-lookup">
      <h2>🔍 WoW Character Lookup</h2>
      <p>
        The purpose of using the World of Warcraft API is to access real-time
        game data and provide users with dynamic insights. By integrating this
        API, developers can:
        <ul>
          <li>
            Retrieve character statistics, achievements, and gear information.
          </li>
          <li>Display leaderboard rankings and PvP stats.</li>
          <li>Fetch in-game economy data, such as auction house prices.</li>
          <li>Enhance user experiences with personalized game analytics.</li>
          <li>
            Provide real-time updates on raid progression and guild activities.
          </li>
        </ul>
        This integration allows players and developers to interact with WoW’s
        vast game world programmatically, improving data accessibility and
        engagement.
      </p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Realm (e.g., stormrage)"
          value={realm}
          onChange={(e) => setRealm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="searchButton" onClick={fetchCharacterData}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {characterData && (
        <div className="character-info">
          <h3>
            {characterData.name} -{" "}
            {characterData.realm?.name || "Unknown Realm"}
          </h3>
          <p>Level: {characterData.level}</p>
          <p>Faction: {characterData.faction?.name || "Unknown"}</p>
          <p>Achievement Points: {characterData.achievement_points || 0}</p>

          {characterData.race && (
            <p>Race: {characterData.race.name || "Unknown"}</p>
          )}

          {characterData.class && (
            <p>Class: {characterData.class.name || "Unknown"}</p>
          )}

          {characterData.active_spec && (
            <p>Specialization: {characterData.active_spec.name || "Unknown"}</p>
          )}

          {characterData.guild && (
            <p>Guild: {characterData.guild.name || "No Guild"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterLookup;
