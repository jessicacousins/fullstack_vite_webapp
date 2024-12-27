const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
    const buffer = Buffer.from(data, "base64"); // Convert to buffer

    // Ensure the directory exists
    const dir = path.join(__dirname, "../uploads/selfies");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create the directory
    }

    const filePath = path.join(dir, `${Date.now()}.${extension}`); // Save with a timestamped filename
    fs.writeFileSync(filePath, buffer); // Write the image to disk

    res.status(200).json({ message: "Image uploaded successfully!", filePath });
  } catch (error) {
    console.error("Error uploading base64 image:", error.message);
    res.status(500).json({ error: error.message || "Failed to upload image" });
  }
});

router.post("/add-selfie", async (req, res) => {
  try {
    const { email, selfiePath } = req.body;
    if (!email || !selfiePath)
      throw new Error("Email and selfie path required");

    const user = await User.findOneAndUpdate(
      { email },
      { $push: { selfies: selfiePath } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile with selfie:", error.message);
    res.status(500).json({ error: "Failed to update profile with selfie" });
  }
});

module.exports = router;
