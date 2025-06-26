const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const vendorSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "Firstname must be 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "email must be 8 character long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be 8 character long"],
    select: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: [11, "password must be 11 character long"],
  },
  service: {
    serviceName: {
      type: String,
      enum: ["salon", "transportation", "venue", "photography"],
    },
    serviceDetails: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "service.serviceName",
    },
  },
  packages: [
    {
      title: String,
      Description: String,
      Pricing: Number,
    },
  ],
  bookedDates: [{ type: String }],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },
  ],
});

vendorSchema.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

vendorSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

vendorSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("vendor", vendorSchema);
