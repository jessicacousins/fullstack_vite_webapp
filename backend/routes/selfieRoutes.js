const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const {
  analyzeLabelsWithOpenAI,
  saveImage,
} = require("../services/selfieService");

// multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/selfies");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post("/analyze-image", async (req, res) => {
  const { email, labels, image } = req.body; // Expecting labels, email, and base64 image.

  if (!email || !labels || !image || !Array.isArray(labels)) {
    return res
      .status(400)
      .json({ error: "Email, valid labels, and image are required." });
  }

  try {
    // Save the image file
    const filePath = saveImage(image);

    // Generate a description using OpenAI
    const description = await analyzeLabelsWithOpenAI(labels);

    // Save the labels, description, and image file path in the user's profile
    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          selfies: {
            labels, // Save the detected labels
            description, // Save the generated description
            imagePath: filePath, // Save the file path
            date: new Date(), // Save the timestamp
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Image analyzed and saved successfully!",
      description,
      imagePath: filePath,
      updatedSelfies: user.selfies,
    });
  } catch (error) {
    console.error("Error analyzing and saving image:", error);
    res.status(500).json({ error: "Failed to analyze and save image." });
  }
});

// POST route to store labels in the user's profile
router.post("/upload-selfie", async (req, res) => {
  try {
    const { email, labels } = req.body;

    if (!email || !labels) {
      return res.status(400).json({ error: "Email and labels are required." });
    }

    // Find user and update their profile with detected labels
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { selfies: { labels, date: new Date() } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Labels stored successfully!",
      updatedSelfies: user.selfies,
    });
  } catch (error) {
    console.error("Error storing labels:", error.message);
    res.status(500).json({ error: "Failed to store labels." });
  }
});

// POST route to upload image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

router.post("/upload-base64", (req, res) => {
  try {
    const { image } = req.body;
    if (!image) throw new Error("No image provided");

    // Validate and extract base64 data
    const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
    if (!matches) throw new Error("Invalid image format");

    const extension = matches[1]; // "png" or "jpeg"
    const data = matches[2]; // Base64-encoded data
    const buffer = Buffer.from(data, "base64");

    const dir = path.join(__dirname, "../uploads/selfies");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${Date.now()}.${extension}`);
    fs.writeFileSync(filePath, buffer);

    res.status(200).json({ message: "Image uploaded successfully!", filePath });
  } catch (error) {
    console.error("Error uploading base64 image:", error.message);
    res.status(500).json({ error: error.message || "Failed to upload image" });
  }
});

module.exports = router;
