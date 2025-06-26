const mongoose = require("mongoose");

const salonSchema = mongoose.Schema({
  salonName: {
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
  openingHours: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("salon", salonSchema);
