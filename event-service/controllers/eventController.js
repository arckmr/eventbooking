const Event = require("../models/Events");
const mongoose = require("mongoose");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    console.log(req.params.id, "params");
    // const id = mongoose.Types.ObjectId(req.params.id);
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.status(200).send({ message: "Event deleted", event });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
