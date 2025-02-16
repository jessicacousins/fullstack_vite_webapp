const mongoose = require("mongoose");

const TestTrainingSchema = new mongoose.Schema({
  trainingId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sections: [
    {
      title: String,
      content: String,
      question: {
        text: String,
        options: [String],
        correct: String,
      },
    },
  ],
  finalTest: [
    {
      question: String,
      options: [String],
      correct: String,
    },
  ],
});

module.exports = mongoose.model("TestTraining", TestTrainingSchema);
