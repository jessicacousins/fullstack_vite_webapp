const express = require("express");
const router = express.Router();
const TestTraining = require("../models/TestTraining");
const TrainingAttempt = require("../models/TrainingAttempt");

// Training Data Loads at Startup here
const preloadTrainings = async () => {
  const existingTrainings = await TestTraining.find();
  if (existingTrainings.length === 0) {
    const trainingData = [
      {
        trainingId: "workplace-safety",
        title: "Workplace Safety",
        sections: [
          {
            title: "Introduction to Safety",
            content:
              "Workplace safety prevents injuries and ensures productivity.",
            question: {
              text: "What is the goal of safety?",
              options: ["Prevent injuries", "Increase profits"],
              correct: "Prevent injuries",
            },
          },
          {
            title: "Fire Safety",
            content:
              "Fire safety includes evacuation routes and extinguisher use.",
            question: {
              text: "What should you do in a fire?",
              options: ["Evacuate", "Hide under desk"],
              correct: "Evacuate",
            },
          },
        ],
        finalTest: [
          {
            question: "What is the main goal of safety?",
            options: ["Prevent injuries", "Make more money"],
            correct: "Prevent injuries",
          },
          {
            question: "What do you do first in a fire?",
            options: ["Evacuate", "Call a friend"],
            correct: "Evacuate",
          },
        ],
      },
      {
        trainingId: "cybersecurity-awareness",
        title: "Cybersecurity Awareness",
        sections: [
          {
            title: "Understanding Threats",
            content:
              "Threats include phishing, malware, and social engineering.",
            question: {
              text: "What is phishing?",
              options: ["Fake email tricking users", "A type of malware"],
              correct: "Fake email tricking users",
            },
          },
          {
            title: "Password Best Practices",
            content:
              "Use strong passwords and enable two-factor authentication.",
            question: {
              text: "Which is a strong password?",
              options: ["123456", "X#v8@7!p"],
              correct: "X#v8@7!p",
            },
          },
        ],
        finalTest: [
          {
            question: "What is phishing?",
            options: ["Fake email tricking users", "Social media hack"],
            correct: "Fake email tricking users",
          },
          {
            question: "Which is the best password?",
            options: ["password", "X#v8@7!p"],
            correct: "X#v8@7!p",
          },
        ],
      },
    ];
    await TestTraining.insertMany(trainingData);
    console.log("Test Trainings Preloaded into Database");
  }
};

// ✅ Fetch ALL Trainings
router.get("/", async (req, res) => {
  try {
    const trainings = await TestTraining.find();
    res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ error: "Failed to fetch trainings." });
  }
});

// ✅ Fetch Single Training by ID
router.get("/:trainingId", async (req, res) => {
  try {
    const training = await TestTraining.findOne({
      trainingId: req.params.trainingId,
    });
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.json(training);
  } catch (error) {
    res.status(500).json({ error: "Error fetching training" });
  }
});

// ✅ Save User Answers for progress Tracking
router.post("/:trainingId/progress", async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers) {
      return res
        .status(400)
        .json({ error: "User ID and answers are required" });
    }

    const attempt = new TrainingAttempt({
      userId,
      trainingId: req.params.trainingId,
      answers,
    });

    await attempt.save();
    res.json({ message: "Progress saved successfully" });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

// ✅ Submit Final Test and Calculate Score
router.post("/:trainingId/submit-test", async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers) {
      return res
        .status(400)
        .json({ error: "User ID and answers are required" });
    }

    const training = await TestTraining.findOne({
      trainingId: req.params.trainingId,
    });

    if (!training) return res.status(404).json({ error: "Training not found" });

    const correctAnswers = training.finalTest.map((q) => q.correct);
    const userScore =
      (Object.values(answers).filter((a, i) => a === correctAnswers[i]).length /
        correctAnswers.length) *
      100;
    const passed = userScore >= 80;

    const attempt = new TrainingAttempt({
      userId,
      trainingId: req.params.trainingId,
      answers,
      score: userScore,
      passed,
    });

    await attempt.save();
    res.json({ score: userScore, passed });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ error: "Failed to submit test" });
  }
});

// ✅ Fetch User Training History
router.get("/history/:userId", async (req, res) => {
  try {
    const attempts = await TrainingAttempt.find({ userId: req.params.userId });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user training history" });
  }
});

// Preload Trainings on Server Start
preloadTrainings();

module.exports = router;
