const mongoose = require("mongoose");
const photographySchema = mongoose.Schema({
  photographerName: {
    type: String,
    required: true,
  },
  photographySpeciality: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  priceRange: {
    min: Number,
    max: Number,
  },
  Description: String,
  profileImage: String,
  portfolioImage: String,
  services: {
    type: Array,
    of: String,
  },
});

module.exports = mongoose.model("photography", photographySchema);
