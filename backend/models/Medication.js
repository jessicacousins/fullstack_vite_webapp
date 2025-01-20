const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  route: { type: String, required: true },
  time: { type: String, required: true },
  person: { type: String, required: true },
  image: { type: String },
  orders: { type: String },
  createdAt: { type: Date, default: Date.now },
  submitTime: { type: Date, default: Date.now }, // timestamp submission happened
  submittedBy: { type: String, required: true }, // username of submitter
  acknowledgedBy: {
    name: { type: String, required: true }, // signed by the user
    timestamp: { type: Date, default: Date.now }, // time  acknowledgment happened
  },
  acknowledgedCheckbox: { type: Boolean, required: true }, // checked the agreement box
});

module.exports = mongoose.model("Medication", MedicationSchema);
