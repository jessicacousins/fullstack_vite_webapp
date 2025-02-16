const express = require("express");
const router = express.Router();
const TestTraining = require("../models/TestTraining");
const TrainingAttempt = require("../models/TrainingAttempt");

// Training data loads at startup here - note: reload data on backend by deleting manually to reset when adding more content
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
              "Workplace safety prevents injuries and ensures productivity. Common hazards include slips, falls, and heavy machinery accidents.",
            question: {
              text: "What is the goal of safety?",
              options: ["Prevent injuries", "Increase profits"],
              correct: "Prevent injuries",
            },
          },
          {
            title: "Fire Safety",
            content:
              "Fire safety includes knowing evacuation routes, using extinguishers, and following emergency protocols.",
            question: {
              text: "What should you do in a fire?",
              options: ["Evacuate", "Hide under desk"],
              correct: "Evacuate",
            },
          },
          {
            title: "First Aid Basics",
            content:
              "Knowing basic first aid, such as CPR and treating minor burns, can help prevent serious injuries at work.",
            question: {
              text: "What is the first thing you should do for a burn?",
              options: ["Run it under cool water", "Cover it with a dry cloth"],
              correct: "Run it under cool water",
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
          {
            question: "What is an important first aid response for burns?",
            options: ["Cool water", "Apply butter"],
            correct: "Cool water",
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
              "Cyber threats include phishing, malware, and social engineering. Attackers often impersonate trusted sources.",
            question: {
              text: "What is phishing?",
              options: ["Fake email tricking users", "A type of malware"],
              correct: "Fake email tricking users",
            },
          },
          {
            title: "Password Best Practices",
            content:
              "Use strong passwords and enable two-factor authentication to protect your accounts.",
            question: {
              text: "Which is a strong password?",
              options: ["123456", "X#v8@7!p"],
              correct: "X#v8@7!p",
            },
          },
          {
            title: "Safe Browsing",
            content:
              "Avoid clicking on unknown links, verify website security, and be cautious with downloads.",
            question: {
              text: "What should you check before entering login credentials on a website?",
              options: [
                "The URL and security certificate",
                "How flashy the site looks",
              ],
              correct: "The URL and security certificate",
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
          {
            question: "What should you check before logging in?",
            options: ["Website security certificate", "Website animations"],
            correct: "Website security certificate",
          },
        ],
      },
      {
        trainingId: "effective-communication",
        title: "Effective Workplace Communication",
        sections: [
          {
            title: "The Importance of Clear Communication",
            content:
              "Miscommunication can lead to workplace conflicts and inefficiencies. Clear, concise communication is essential.",
            question: {
              text: "What is a key benefit of clear communication?",
              options: ["Avoids misunderstandings", "Increases office gossip"],
              correct: "Avoids misunderstandings",
            },
          },
          {
            title: "Active Listening",
            content:
              "Active listening means fully focusing, understanding, and responding to the speaker.",
            question: {
              text: "What is active listening?",
              options: [
                "Fully engaging in the conversation",
                "Waiting for your turn to speak",
              ],
              correct: "Fully engaging in the conversation",
            },
          },
          {
            title: "Non-Verbal Communication",
            content:
              "Body language, facial expressions, and tone of voice play a huge role in effective communication.",
            question: {
              text: "What is a form of non-verbal communication?",
              options: ["Body language", "Reading aloud"],
              correct: "Body language",
            },
          },
        ],
        finalTest: [
          {
            question: "What is a benefit of clear communication?",
            options: ["Avoids misunderstandings", "Encourages office rumors"],
            correct: "Avoids misunderstandings",
          },
          {
            question: "What is active listening?",
            options: [
              "Fully engaging in the conversation",
              "Thinking about what to say next",
            ],
            correct: "Fully engaging in the conversation",
          },
          {
            question: "What is an example of non-verbal communication?",
            options: ["Body language", "Email"],
            correct: "Body language",
          },
        ],
      },
      {
        trainingId: "time-management",
        title: "Time Management Skills",
        sections: [
          {
            title: "The Importance of Time Management",
            content:
              "Managing time effectively increases productivity and reduces stress.",
            question: {
              text: "Why is time management important?",
              options: ["Increases productivity", "Lets you multitask better"],
              correct: "Increases productivity",
            },
          },
          {
            title: "Prioritization Techniques",
            content:
              "Using tools like the Eisenhower Matrix helps prioritize tasks effectively.",
            question: {
              text: "What is a method for prioritizing tasks?",
              options: ["Eisenhower Matrix", "Guessing"],
              correct: "Eisenhower Matrix",
            },
          },
          {
            title: "Avoiding Procrastination",
            content:
              "Breaking tasks into smaller steps and setting deadlines can help reduce procrastination.",
            question: {
              text: "What helps prevent procrastination?",
              options: [
                "Breaking tasks into small steps",
                "Waiting until the last minute",
              ],
              correct: "Breaking tasks into small steps",
            },
          },
        ],
        finalTest: [
          {
            question: "Why is time management important?",
            options: ["Increases productivity", "Lets you rush everything"],
            correct: "Increases productivity",
          },
          {
            question: "What is a prioritization technique?",
            options: ["Eisenhower Matrix", "Guesswork"],
            correct: "Eisenhower Matrix",
          },
          {
            question: "How can you avoid procrastination?",
            options: [
              "Breaking tasks into smaller steps",
              "Ignoring deadlines",
            ],
            correct: "Breaking tasks into smaller steps",
          },
        ],
      },
      {
        trainingId: "conflict-resolution",
        title: "Conflict Resolution in the Workplace",
        sections: [
          {
            title: "Understanding Workplace Conflicts",
            content:
              "Conflicts arise due to miscommunication, differing perspectives, or competition.",
            question: {
              text: "What is a common cause of workplace conflict?",
              options: ["Miscommunication", "Good teamwork"],
              correct: "Miscommunication",
            },
          },
          {
            title: "Strategies for Resolution",
            content:
              "Using active listening, mediation, and compromise can help resolve conflicts effectively.",
            question: {
              text: "What helps resolve workplace conflicts?",
              options: ["Mediation", "Ignoring the problem"],
              correct: "Mediation",
            },
          },
          {
            title: "Maintaining a Positive Work Environment",
            content:
              "Encouraging open communication and teamwork helps prevent conflicts.",
            question: {
              text: "What helps maintain a positive work environment?",
              options: ["Open communication", "Office gossip"],
              correct: "Open communication",
            },
          },
        ],
        finalTest: [
          {
            question: "What is a common cause of workplace conflict?",
            options: ["Miscommunication", "Great leadership"],
            correct: "Miscommunication",
          },
          {
            question: "What is a good conflict resolution strategy?",
            options: ["Mediation", "Avoiding the issue"],
            correct: "Mediation",
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
