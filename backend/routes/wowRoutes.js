const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const BLIZZARD_CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const BLIZZARD_CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;
const BLIZZARD_TOKEN_URL = "https://oauth.battle.net/token";
const BLIZZARD_API_BASE = "https://us.api.blizzard.com";

let accessToken = null; // store token in memory

// Fetch OAuth Token from Blizzard API
const getBlizzardToken = async () => {
  try {
    const response = await axios.post(
      BLIZZARD_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: BLIZZARD_CLIENT_ID,
          password: BLIZZARD_CLIENT_SECRET,
        },
      }
    );

    accessToken = response.data.access_token;
    console.log("✅ Blizzard API Token Acquired");
    return accessToken;
  } catch (error) {
    console.error("❌ Failed to get Blizzard token:", error.response?.data);
    throw new Error("Blizzard API authentication failed.");
  }
};

// 🏹 Get Character Data from Blizzard API
router.get("/character/:realm/:name", async (req, res) => {
  const { realm, name } = req.params;

  try {
    if (!accessToken) {
      await getBlizzardToken(); //  token
    }

    const response = await axios.get(
      `${BLIZZARD_API_BASE}/profile/wow/character/${realm}/${name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Battlenet-Namespace": "profile-us",
        },
      }
    );

    const data = response.data;

    res.json({
      name: data.name,
      realm: data.realm?.name || realm,
      level: data.level,
      faction: data.faction?.name || "Unknown",
      race: data.race?.name || "Unknown",
      class: data.character_class?.name || "Unknown",
      active_spec: data.active_spec?.name || "Unknown",
      guild: data.guild?.name || "No Guild",
      achievement_points: data.achievement_points || 0,
    });
  } catch (error) {
    console.error("❌ Error fetching character data:", error.response?.data);
    res.status(500).json({ error: "Failed to fetch character data." });
  }
});

module.exports = router;
