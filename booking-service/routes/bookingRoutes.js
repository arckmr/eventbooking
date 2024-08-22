const express = require("express");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("@common/authMiddleware"); // Assuming the middleware is in the common directory

const router = express.Router();

// Create a booking
router.post("/book", authMiddleware, bookingController.createBooking);

// Get all bookings
router.get("/", authMiddleware, bookingController.getBookings);

// Get a booking by ID
router.get("/:id", authMiddleware, bookingController.getBookingById);

// Cancel a booking
router.delete("/:id", authMiddleware, bookingController.cancelBooking);

module.exports = router;
