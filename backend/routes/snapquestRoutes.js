const express = require("express");
const multer = require("multer");
const {
  checkImageContent,
  storeImage,
  updateLeaderboard,
  getLeaderboard,
} = require("../services/snapquestService");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), async (req, res) => {
  const { username, challenge } = req.body;
  const imagePath = req.file.path;

  try {
    console.log(
      `Processing image upload for user: ${username}, challenge: ${challenge}`
    );

    // check if content is appropriate
    const isSafe = await checkImageContent(imagePath);
    if (!isSafe) {
      return res.json({
        success: false,
        message: "Inappropriate content detected.",
      });
    }

    // store image and update leaderboard
    const storedImagePath = await storeImage(username, imagePath, challenge);
    await updateLeaderboard(username);

    res.json({
      success: true,
      message: "Image accepted!",
      path: storedImagePath,
    });
  } catch (error) {
    console.error("Error handling image upload:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
