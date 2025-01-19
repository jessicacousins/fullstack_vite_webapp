const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  route: { type: String, required: true },
  time: { type: String, required: true },
  person: { type: String, required: true },
  image: { type: String },
  orders: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Medication", MedicationSchema);
