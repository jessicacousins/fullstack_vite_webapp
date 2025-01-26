const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  events: [
    {
      title: { type: String, required: true },
      description: { type: String },
      time: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const CalendarEvent = mongoose.model("CalendarEvent", CalendarEventSchema);
module.exports = CalendarEvent;
