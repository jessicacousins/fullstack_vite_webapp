const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  ip: {
    type: String, // IP address
  },
  deviceInfo: {
    browser: String, // Browser information
    os: String, // Operating system information
    device: String, // Device information (mobile, desktop, etc.)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
