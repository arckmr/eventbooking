const Booking = require("../models/Booking");
const axios = require("axios");
const mongoose = require("mongoose");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { eventId, seats } = req.body;
    const userId = req.user.id;

    console.log({ eventId, seats, userId }, "event body");

    // Fetch event details from event-service
    const eventResponse = await axios.get(
      `${process.env.EVENT_SERVICE_URL}/${eventId}`,
    );
    const event = eventResponse.data;

    // Check if there are enough available seats
    if (event.availableSeats <= 0) {
      return res
        .status(400)
        .send({ error: "No seats available for this event" });
    }

    // Create a new booking
    const booking = new Booking({
      userId,
      eventId: event._id,
      seats,
      status: "booked",
    });

    // Save the booking
    await booking.save();

    // Update the available seats in the event-service
    await axios.put(
      `${process.env.EVENT_SERVICE_URL}/${eventId}`,
      {
        availableSeats: event.availableSeats - 1,
      },
      {
        headers: {
          Authorization: req.header("Authorization"),
        },
      },
    );

    // Send the created booking back to the client
    res.status(201).send(booking);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" });
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" });
    }
    res.status(200).send({ message: "Booking canceled", booking });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
