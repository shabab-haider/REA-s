const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
    required: true,
  },

  title: String,
  pricing: String,
  date: String,
  contact: String,
  location: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("booking", bookingSchema);
