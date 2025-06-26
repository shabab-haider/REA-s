const mongoose = require("mongoose");

const venueSchema = mongoose.Schema({
  venueName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  guestCapacity: {
    type: String,
    required: true,
  },
  priceRange: {
    min: Number,
    max: Number,
  },
  Description: String,
  Image: String,
  features: {
    type: Array,
    of: String,
  },
});

module.exports = mongoose.model("venue", venueSchema);
