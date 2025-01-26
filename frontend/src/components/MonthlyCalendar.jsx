import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MonthlyCalendar.css";

const MonthlyCalendar = ({ isAdmin }) => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    description: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/calendar", {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth(),
        },
      });
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newEvent.date) newErrors.date = "Date is required.";
    if (!newEvent.title) newErrors.title = "Title is required.";
    if (!newEvent.description)
      newErrors.description = "Description is required.";
    if (!newEvent.time) newErrors.time = "Time is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEvent = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("/api/calendar", newEvent);
      fetchEvents();
      setNewEvent({ date: "", title: "", description: "", time: "" });
      setErrors({});
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const calendar = Array.from({ length: firstDay }).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }

    return calendar.map((day, index) => {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dayEvents = events.find(
        (e) =>
          new Date(e.date).toLocaleDateString() === date.toLocaleDateString()
      );

      return (
        <div key={index} className="calendar-day">
          <h4>{day}</h4>
          {dayEvents?.events.map((event, idx) => (
            <div
              key={idx}
              className="event"
              onClick={() => handleEventClick(event)}
            >
              <strong>{event.title}</strong>
              <p>{event.time}</p>
            </div>
          ))}
        </div>
      );
    });
  };

  const handleMonthChange = (direction) => {
    const newMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + direction)
    );
    setCurrentMonth(newMonth);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>Previous</button>
        <h2>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button onClick={() => handleMonthChange(1)}>Next</button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      {isAdmin && (
        <div className="add-event-form">
          <h3>Add Event</h3>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          {errors.time && <p className="error-text">{errors.time}</p>}
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
      {selectedEvent && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p>
              <strong>Time:</strong> {selectedEvent.time}
            </p>
            <p>{selectedEvent.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;
