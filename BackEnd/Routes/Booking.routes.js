const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/booking.controller");

router.post("/create/:vendorId", bookingController.createBooking);

router.post("/statusUpdate", bookingController.updateStatus);

module.exports = router;
