const mongoose = require("mongoose");

const TimeEntrySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  isHoliday: { type: Boolean, default: false },
});

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);
