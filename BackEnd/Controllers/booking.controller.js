const bookingModel = require("../models/booking.model");
const vendorModel = require("../models/vendor.model");

module.exports.createBooking = async (req, res) => {
  try {
    const { title, pricing, date, contact, location, description } = req.body;
    const { vendorId } = req.params;
    // Step 1: Check if vendor exists
    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Step 2: Create new booking
    const newBooking = await bookingModel.create({
      title,
      pricing,
      date,
      contact,
      location,
      description,
      vendorId,
    });

    // Step 3: Optionally push to vendor.notifications
    await vendorModel.findByIdAndUpdate(vendorId, {
      $push: { notifications: newBooking._id },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

module.exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};
