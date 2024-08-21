require("../alias-config");
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("@common/authMiddleware");

// Create a new event
router.post("/event", authMiddleware, eventController.createEvent);

// Get all events
router.get("/events", eventController.getEvents);

// Get a single event by ID
router.get("/:id", eventController.getEventById);

// Update an event
router.put("/:id", authMiddleware, eventController.updateEvent);

// Delete an event
router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;
