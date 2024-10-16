const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  value: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const MemoryGameScoreSchema = new mongoose.Schema({
  turns: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SimonSaysGameRecordSchema = new mongoose.Schema({
  levelReached: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

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
  dob: {
    type: Date,
    required: true,
  },
  deviceInfo: {
    browser: String, // Browser information
    os: String, // Operating system information
    device: String, // Device information (mobile, desktop, etc.)
  },
  deviceType: {
    type: String,
  },
  os: {
    type: String,
  },
  loginHistory: [
    {
      type: Date,
    },
  ],
  policyAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  scores: [ScoreSchema],
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  gamesWon: {
    type: Number,
    default: 0,
  },
  gamesLost: {
    type: Number,
    default: 0,
  },
  highestScore: {
    type: Number,
    default: 0,
  },
  longestWinningStreak: {
    type: Number,
    default: 0,
  },
  currentWinningStreak: {
    type: Number,
    default: 0,
  },
  memoryGameScores: [MemoryGameScoreSchema],
  bestMemoryGameScore: {
    type: Number,
    default: null,
  },
  simonSaysGameRecords: [SimonSaysGameRecordSchema],
  simonSaysGamesPlayed: {
    type: Number,
    default: 0,
  },
  simonSaysHighestLevel: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
