const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const Cart = require("../models/Cart");
const bcrypt = require("bcryptjs");
const requestIp = require("request-ip"); // For collecting IP address
const useragent = require("useragent"); // For capturing user agent info
const Employee = require("../models/Employee");

// @route POST /api/users/login
// @desc Log last login info in MongoDB (not for re-authentication)
router.post("/login", async (req, res) => {
  const { email } = req.body; // Only email is needed

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Update login details (optional)
    user.lastLogin = new Date();
    user.ip = requestIp.getClientIp(req);
    user.deviceInfo = useragent.parse(req.headers["user-agent"]).toString();

    await user.save();
    res.status(200).json({ msg: "Login info updated", user });
  } catch (err) {
    console.error("Error during login update:", err.message);
    res.status(500).send("Server error");
  }
});

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// @route POST /api/users/register
// @desc Register a new user (including capturing IP and User-Agent info)
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    bio,
    photoURL,
    googleUID,
    dob, // Date of birth might be missing from Google
    policyAccepted,
  } = req.body;

  try {
    // Check if the user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Check if DOB is missing (for Google sign-ups)
    if (!dob) {
      return res
        .status(400)
        .json({ msg: "Date of birth is required for Google sign-ups." });
    }

    // new user object for Google sign-ups
    user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      phone,
      bio,
      photoURL,
      dob,
      googleUID, // Store Google UID for future reference
      policyAccepted,
    });

    // Save the user in the database
    await user.save();
    res.status(200).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/update     Update user profile
router.post("/update", async (req, res) => {
  const { email, firstName, lastName, phone, bio, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.bio = bio;
    user.photoURL = photoURL;

    // Save the updated user to the database
    await user.save();

    res.json({ user });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).send("Server error");
  }
});

// ! regular user route not god tier access
// router.get("/:email", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

// ! god tier payroll - not running at all times
router.get("/:email", async (req, res) => {
  try {
    const user = await Employee.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ role: user.role });
  } catch (error) {
    console.error("Error fetching user role:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a comment to a blog post
router.post("/:id/comments", async (req, res) => {
  const { body, user } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const newComment = {
      body,
      date: new Date(),
      user,
    };

    blog.comments.push(newComment);

    // Update user's total comments count
    const userDoc = await User.findOne({ email: user });
    if (userDoc) {
      userDoc.totalComments += 1;
      await userDoc.save();
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Player Score
router.post("/update-score", async (req, res) => {
  const { email, score, didWin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Increment games played
    user.gamesPlayed += 1;

    if (didWin) {
      user.gamesWon += 1; // Increment games won
      user.currentWinningStreak += 1; // Increment current streak
      if (user.currentWinningStreak > user.longestWinningStreak) {
        user.longestWinningStreak = user.currentWinningStreak; // Update longest streak
      }
    } else {
      user.gamesLost += 1; // Increment games lost
      user.currentWinningStreak = 0; // Reset current streak on loss
    }

    // Check if new score is the highest score
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    // Add the new score with the current date
    user.scores.push({ value: score });

    await user.save();

    res.status(200).json({ msg: "Score updated", user });
  } catch (error) {
    console.error("Error updating score:", error.message);
    res.status(500).send("Server error");
  }
});

// Get User Stats
router.get("/stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      gamesLost: user.gamesLost,
      highestScore: user.highestScore,
      longestWinningStreak: user.longestWinningStreak,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).send("Server error");
  }
});

// Update Memory Game Score
router.post("/update-memory-score", async (req, res) => {
  const { email, turns } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add the new score
    user.memoryGameScores.push({ turns });

    // Update best score
    if (user.bestMemoryGameScore === null || turns < user.bestMemoryGameScore) {
      user.bestMemoryGameScore = turns;
    }

    await user.save();

    res.status(200).json({ msg: "Memory game score updated", user });
  } catch (error) {
    console.error("Error updating memory game score:", error.message);
    res.status(500).send("Server error");
  }
});

// Get Memory Game Stats
router.get("/memory-game-stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.memoryGameScores.length,
      bestScore: user.bestMemoryGameScore,
      scores: user.memoryGameScores,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching memory game stats:", error.message);
    res.status(500).send("Server error");
  }
});

router.post("/update-simon-says-score", async (req, res) => {
  const { email, levelReached, mistakesMade } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add the new game record
    user.simonSaysGameRecords.push({ levelReached, mistakesMade });

    // Increment games played
    user.simonSaysGamesPlayed += 1;

    // Update highest level reached
    if (levelReached > user.simonSaysHighestLevel) {
      user.simonSaysHighestLevel = levelReached;
    }

    // Update levels completed without mistakes
    if (mistakesMade === 0) {
      user.simonSaysLevelsCompleted += levelReached;
    }

    await user.save();
    res.status(200).json({ msg: "Simon Says score updated", user });
  } catch (error) {
    console.error("Error updating Simon Says score:", error.message);
    res.status(500).send("Server error");
  }
});

// Get Simon Says Stats
router.get("/simon-says-stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.simonSaysGamesPlayed,
      highestLevel: user.simonSaysHighestLevel,
      gameRecords: user.simonSaysGameRecords,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching Simon Says stats:", error.message);
    res.status(500).send("Server error");
  }
});

// POST /api/users/check-email
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// fetch SnapQuest stats
router.get("/snapquest-stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const snapQuestStats = {
      highestScore: user.highestSnapQuestScore,
      scores: user.snapQuestScores,
    };

    res.json(snapQuestStats);
  } catch (error) {
    console.error("Error fetching SnapQuest stats:", error.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE /api/users/:email
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error.message);
    res.status(500).send("Server error");
  }
});

// @route GET /api/users/:email/comments
// @desc Get all comments made by a user
router.get("/:email/comments", async (req, res) => {
  try {
    const blogs = await Blog.find({ "comments.user": req.params.email });
    const userComments = [];

    blogs.forEach((blog) => {
      blog.comments.forEach((comment) => {
        if (comment.user === req.params.email) {
          userComments.push({
            blogId: blog._id,
            blogTitle: blog.title,
            commentId: comment._id,
            body: comment.body,
            date: comment.date,
            sentiment: comment.sentimentAnalysis,
          });
        }
      });
    });

    res.json(userComments);
  } catch (err) {
    console.error("Error fetching user comments:", err.message);
    res.status(500).send("Server error");
  }
});

// @route GET /api/users/:email/posts
// @desc Get all blog posts made by a user
router.get("/:email/posts", async (req, res) => {
  try {
    const userPosts = await Blog.find({ author: req.params.email });
    res.json(userPosts);
  } catch (err) {
    console.error("Error fetching user posts:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/view-product
// @desc Log a product view for a user
// router.post("/view-product", async (req, res) => {
//   const { email, productId, title, category } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // Add the viewedProducts array displaying in the Users data
//     user.viewedProducts.push({
//       productId,
//       title,
//       category,
//     });

//     await user.save();

//     res.status(200).json({ msg: "Product view logged", user });
//   } catch (error) {
//     console.error("Error logging product view:", error.message);
//     res.status(500).send("Server error");
//   }
// });
// @route POST /api/users/view-product
router.post("/view-product", async (req, res) => {
  const { email, productId, title, category } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.viewedProducts.push({
      productId,
      title,
      category,
      viewedAt: new Date(),
    });

    await user.save();

    res.status(200).json({ msg: "Product view logged", user });
  } catch (error) {
    console.error("Error logging product view:", error.message);
    res.status(500).send("Server error");
  }
});

// Fetch Top 10 Blackjack Scores
router.get("/leaderboard/blackjack", async (req, res) => {
  try {
    const topBlackjackScores = await User.find()
      .sort({ highestScore: -1 })
      .limit(10)
      .select("email highestScore");
    res.json(topBlackjackScores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

// Fetch Top 10 Memory Game Scores (fewest turns)
router.get("/leaderboard/memory-game", async (req, res) => {
  try {
    const topMemoryGameScores = await User.find()
      .sort({ bestMemoryGameScore: 1 })
      .limit(10)
      .select("email bestMemoryGameScore");
    res.json(topMemoryGameScores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

// Fetch Top 10 Simon Says Levels
router.get("/leaderboard/simon-says", async (req, res) => {
  try {
    const topSimonSaysScores = await User.find()
      .sort({ simonSaysHighestLevel: -1 })
      .limit(10)
      .select("email simonSaysHighestLevel");
    res.json(topSimonSaysScores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

// Fetch Top 10 SnapQuest Scores
router.get("/leaderboard/snapquest", async (req, res) => {
  try {
    const topSnapQuestScores = await User.find()
      .sort({ highestSnapQuestScore: -1 })
      .limit(10)
      .select("email highestSnapQuestScore");
    res.json(topSnapQuestScores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

// ! achievements blog and games
router.get("/:email/achievements", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Initialize dynamic achievements array
    const dynamicAchievements = [];

    // **Product Viewing Achievements**
    const viewedProductsCount = user.viewedProducts.length;
    if (viewedProductsCount >= 10) {
      dynamicAchievements.push({
        name: "Product Explorer",
        description: "Viewed 10 different products.",
        dateEarned: new Date(),
      });
    }
    if (viewedProductsCount >= 10) {
      dynamicAchievements.push({
        name: "Product Adventurer",
        description: "Viewed 20 different products.",
        dateEarned: new Date(),
      });
    }
    if (viewedProductsCount >= 50) {
      dynamicAchievements.push({
        name: "Shopaholic",
        description: "Viewed 50 products.",
        dateEarned: new Date(),
      });
    }

    // **Category Explorer Achievement**
    const categoriesViewed = new Set(
      user.viewedProducts.map((p) => p.category)
    );
    if (categoriesViewed.size >= 5) {
      dynamicAchievements.push({
        name: "Category Explorer",
        description: "Viewed products from 5 different categories.",
        dateEarned: new Date(),
      });
    }
    if (categoriesViewed.size >= 5) {
      dynamicAchievements.push({
        name: "Category Adventurer",
        description: "Viewed products from 10 different categories.",
        dateEarned: new Date(),
      });
    }

    // Game achievements for individual games
    if (user.gamesPlayed >= 10) {
      dynamicAchievements.push({
        name: "Blackjack Enthusiast",
        description: "Played 10 games of Blackjack.",
        dateEarned: new Date(),
      });
    }
    if (user.memoryGameScores.length >= 10) {
      dynamicAchievements.push({
        name: "Memory Game Pro",
        description: "Played 10 games of Memory Game.",
        dateEarned: new Date(),
      });
    }
    if (user.snapQuestScores.length >= 10) {
      dynamicAchievements.push({
        name: "SnapQuest Adventurer",
        description: "Played 10 games of SnapQuest.",
        dateEarned: new Date(),
      });
    }
    if (user.simonSaysGamesPlayed >= 10) {
      dynamicAchievements.push({
        name: "Simon Says Expert",
        description: "Played 10 games of Simon Says.",
        dateEarned: new Date(),
      });
    }

    // Combined game achievement
    const playedAllGames =
      user.gamesPlayed >= 10 &&
      user.memoryGameScores.length >= 10 &&
      user.snapQuestScores.length >= 10 &&
      user.simonSaysGamesPlayed >= 10;

    if (playedAllGames) {
      dynamicAchievements.push({
        name: "Ultimate Gamer",
        description: "Played 10 games of all four games.",
        dateEarned: new Date(),
      });
    }

    // Other game-related achievements
    if (user.highestScore >= 100) {
      dynamicAchievements.push({
        name: "Blackjack Master",
        description: "Scored 100 or more in Blackjack.",
        dateEarned: new Date(),
      });
    }
    if (user.bestMemoryGameScore <= 10) {
      dynamicAchievements.push({
        name: "Memory Wizard",
        description: "Completed a memory game in 10 or fewer turns.",
        dateEarned: new Date(),
      });
    }
    if (user.simonSaysHighestLevel >= 15) {
      dynamicAchievements.push({
        name: "Simon Says Pro",
        description: "Reached level 15 in Simon Says.",
        dateEarned: new Date(),
      });
    }

    // Individaul game achievements
    if (user.blackjackWins >= 5) {
      dynamicAchievements.push({
        name: "Blackjack Streaker",
        description: "Won 5 games of Blackjack in a row.",
        dateEarned: new Date(),
      });
    }
    if (user.snapQuestBestTime <= 30) {
      dynamicAchievements.push({
        name: "SnapQuest Speedster",
        description: "Completed a SnapQuest game in under 30 seconds.",
        dateEarned: new Date(),
      });
    }
    if (user.simonSaysLevelsCompleted >= 5) {
      dynamicAchievements.push({
        name: "Simon Says Apprentice",
        description: "Completed 5 Simon Says levels without making a mistake.",
        dateEarned: new Date(),
      });
    }
    if (user.simonSaysLevelsCompleted >= 10) {
      dynamicAchievements.push({
        name: "Simon Says Master",
        description: "Completed 10 Simon Says levels without making a mistake.",
        dateEarned: new Date(),
      });
    }
    if (user.gamesWonAllCategories >= 1) {
      dynamicAchievements.push({
        name: "All-Rounder",
        description: "Won a game in each category.",
        dateEarned: new Date(),
      });
    }
    if (user.blackjackExact21Count >= 5) {
      dynamicAchievements.push({
        name: "Lucky Streak",
        description: "Achieved a Blackjack score of exactly 21 five times.",
        dateEarned: new Date(),
      });
    }

    // Blog-related achievements
    const blogAchievements = [];
    const commentsOnBlogs = await Blog.find({
      "comments.user": req.params.email,
    });
    const likedBlogsCount = await Blog.countDocuments({
      likedBy: req.params.email,
    });
    const totalComments = commentsOnBlogs.reduce(
      (count, blog) =>
        count +
        blog.comments.filter((comment) => comment.user === req.params.email)
          .length,
      0
    );
    const blogCount = await Blog.countDocuments({ author: req.params.email });
    if (blogCount >= 5) {
      blogAchievements.push({
        name: "Blogger Extraordinaire",
        description: "Created 5 or more blog posts.",
        dateEarned: new Date(),
      });
    }
    if (blogCount >= 1) {
      blogAchievements.push({
        name: "First Words",
        description: "Published your first blog post.",
        dateEarned: new Date(),
      });
    }
    if (commentsOnBlogs.length >= 10) {
      blogAchievements.push({
        name: "Discussion Starter",
        description: "Received 10 comments on a single blog post.",
        dateEarned: new Date(),
      });
    }
    if (blogCount >= 20) {
      blogAchievements.push({
        name: "Power Blogger",
        description: "Published 20 blog posts.",
        dateEarned: new Date(),
      });
    }
    if (likedBlogsCount >= 50) {
      blogAchievements.push({
        name: "Top Commenter",
        description: "Liked 50 blog posts.",
        dateEarned: new Date(),
      });
    }
    if (commentsOnBlogs.length >= 100) {
      blogAchievements.push({
        name: "Master of Engagement",
        description: "Accumulated 100 comments across all your blog posts.",
        dateEarned: new Date(),
      });
    }
    if (blogCount >= 3) {
      blogAchievements.push({
        name: "Engagement Starter",
        description: "Published 3 blog posts.",
        dateEarned: new Date(),
      });
    }

    if (likedBlogsCount >= 5) {
      blogAchievements.push({
        name: "Blog Supporter",
        description: "Liked 5 blog posts.",
        dateEarned: new Date(),
      });
    }

    if (commentsOnBlogs.length >= 5) {
      blogAchievements.push({
        name: "Comment Explorer",
        description: "Commented on 5 different blog posts.",
        dateEarned: new Date(),
      });
    }
    if (totalComments >= 1) {
      dynamicAchievements.push({
        name: "First Comment",
        description: "Posted your first comment.",
        dateEarned: new Date(),
      });
    }
    if (totalComments >= 5) {
      dynamicAchievements.push({
        name: "Comment Explorer",
        description: "Posted 5 comments.",
        dateEarned: new Date(),
      });
    }
    if (totalComments >= 10) {
      dynamicAchievements.push({
        name: "Discussion Pro",
        description: "Posted 10 comments.",
        dateEarned: new Date(),
      });
    }

    // Combine all achievements
    const allAchievements = [
      ...user.achievements,
      ...dynamicAchievements,
      ...blogAchievements,
    ];

    res.json(allAchievements);
  } catch (error) {
    console.error("Error fetching achievements:", error.message);
    res.status(500).send("Server error");
  }
});

// ! Add an achievement to a user
router.post("/achievements/add", async (req, res) => {
  const { email, name, description } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const achievement = { name, description, dateEarned: new Date() };
    user.achievements.push(achievement);
    await user.save();

    res.status(200).json({ msg: "Achievement added", user });
  } catch (error) {
    console.error("Error adding achievement:", error.message);
    res.status(500).send("Server error");
  }
});

// ! POST: add a new mood entry
router.post("/:email/mood", async (req, res) => {
  const { mood, journalEntry } = req.body;
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const newMood = { mood, journalEntry, date: new Date() };
    user.moods.push(newMood);
    await user.save();
    res.status(200).json({ msg: "Mood added", moods: user.moods });
  } catch (err) {
    console.error("Error adding mood:", err.message);
    res.status(500).send("Server error");
  }
});

// ! GET retrieve all moods
router.get("/:email/moods", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.moods);
  } catch (err) {
    console.error("Error fetching moods:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
