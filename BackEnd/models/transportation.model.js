const mongoose = require("mongoose");

const transportationSchema = mongoose.Schema({
  BusinessName: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  priceRange: {
    min: Number,
    max: Number,
  },
  Description: String,
  Image: String,
  servicesOffered: {
    type: Array,
    of: String,
  },
});

module.exports = mongoose.model("transportation", transportationSchema);
