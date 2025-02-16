const mongoose = require("mongoose");

const TrainingAttemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    trainingId: { type: String, required: true },
    answers: { type: Map, of: String, required: true },
    score: { type: Number, default: null },
    passed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingAttempt", TrainingAttemptSchema);
