const axios = require("axios");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

const checkImageContent = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/moderations",
      {
        input: imageBuffer.toString("base64"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.results[0].flagged === false;
  } catch (error) {
    console.error("Error checking image content:", error);
    return false;
  }
};

const storeImage = async (username, imagePath, challenge) => {
  const destPath = path.join(
    __dirname,
    "../saved_images",
    `${username}-${challenge}-${Date.now()}.jpg`
  );

  try {
    if (!fs.existsSync(path.dirname(destPath))) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
    }
    fs.renameSync(imagePath, destPath);
    return destPath;
  } catch (error) {
    console.error("Error storing image:", error);
    throw new Error("Failed to store image");
  }
};

const updateLeaderboard = async (username) => {
  if (!username) {
    throw new Error("Username is undefined, cannot update leaderboard.");
  }

  const user = await User.findOne({ email: username });
  if (user) {
    const newScore = (user.highestSnapQuestScore || 0) + 1;
    user.snapQuestScores.push({
      score: newScore,
      challengesCompleted: user.snapQuestScores.length + 1,
    });
    user.highestSnapQuestScore = Math.max(user.highestSnapQuestScore, newScore);
    await user.save();
  } else {
    throw new Error(`User ${username} not found.`);
  }
};

const getLeaderboard = async () => {
  return await User.find()
    .sort({ highestSnapQuestScore: -1 })
    .limit(10)
    .select("username highestSnapQuestScore");
};

module.exports = {
  checkImageContent,
  storeImage,
  updateLeaderboard,
  getLeaderboard,
};
