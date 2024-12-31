const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  journalEntry: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});
const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateEarned: {
    type: Date,
    default: Date.now,
  },
});

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sounds: [
    {
      name: String,
      url: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

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

const ProductViewSchema = new mongoose.Schema({
  productId: String,
  title: String,
  category: String,
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

const SnapQuestScoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  challengesCompleted: {
    type: Number,
    default: 0,
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
  mistakesMade: {
    type: Number,
    default: 0,
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
  selfies: [
    {
      labels: [String],
      description: { type: String, default: "" },
      date: { type: Date, default: Date.now },
    },
  ],
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
  snapQuestScores: [SnapQuestScoreSchema],
  highestSnapQuestScore: {
    type: Number,
    default: 0,
  },
  viewedProducts: [ProductViewSchema],
  achievements: [AchievementSchema],
  wordCount: { type: Number, default: 0 },
  mostLikedPostCount: { type: Number, default: 0 },
  blackjackWins: { type: Number, default: 0 },
  snapQuestBestTime: { type: Number, default: null },
  gamesWonAllCategories: { type: Number, default: 0 },
  simonSaysLevelsCompleted: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  soundboard: [
    {
      name: String,
      url: String,
    },
  ],

  soundPlays: [
    {
      soundName: String,
      playedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  playlists: [PlaylistSchema],
  moods: [MoodSchema],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
