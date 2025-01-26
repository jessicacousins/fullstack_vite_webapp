const express = require("express");
const router = express.Router();
const CalendarEvent = require("../models/CalendarEvent");

// GET all events for a specific month
router.get("/", async (req, res) => {
  const { year, month } = req.query;
  try {
    const events = await CalendarEvent.find({
      date: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, month + 1, 1),
      },
    }).sort("date");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Error fetching events." });
  }
});

// POST a new event
router.post("/", async (req, res) => {
  const { date, title, description, time } = req.body;

  try {
    let calendarEvent = await CalendarEvent.findOne({ date: new Date(date) });
    if (!calendarEvent) {
      calendarEvent = new CalendarEvent({ date, events: [] });
    }

    calendarEvent.events.push({ title, description, time });
    await calendarEvent.save();

    res.json(calendarEvent);
  } catch (err) {
    res.status(500).json({ error: "Error creating event." });
  }
});

// DELETE an event
router.delete("/:id/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  try {
    const calendarEvent = await CalendarEvent.findById(id);
    if (!calendarEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    calendarEvent.events = calendarEvent.events.filter(
      (event) => event._id.toString() !== eventId
    );
    await calendarEvent.save();

    res.json(calendarEvent);
  } catch (err) {
    res.status(500).json({ error: "Error deleting event." });
  }
});

module.exports = router;
