const mongoose = require("mongoose");

const SentimentSchema = new mongoose.Schema({
  sentiment: {
    type: String,
    enum: ["positive", "neutral", "negative"],
    required: true,
  }, // overall sentiment
  positiveProbability: { type: Number }, // probability of + positive sentiment
  neutralProbability: { type: Number }, // probability of =+ neutral sentiment
  negativeProbability: { type: Number }, // probability of - negative sentiment
});

module.exports = SentimentSchema;
