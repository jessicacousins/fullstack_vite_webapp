const mongoose = require("mongoose");

const TimeEntrySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  isHoliday: { type: Boolean, default: false },
  totalHours: { type: Number, default: 0 }, // Calculated after clock-out
  overtimeHours: { type: Number, default: 0 }, // Hours beyond 40/week
  paymentProcessed: { type: Boolean, default: false },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);
