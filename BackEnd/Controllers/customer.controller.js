const { validationResult } = require("express-validator");
const customerServices = require("../Services/customer.service");
const customerModel = require("../models/customer.model");
const bcrypt = require("bcrypt");

module.exports.registercustomer = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(400).json({ errors: err.array() });
  }
  let { fullname, email, password, contactNo } = req.body;
  const hash = await customerModel.hashPassword(password);
  const customer = await customerServices.Createcustomer({
    fullname,
    email,
    password: hash,
    contactNo,
  });
  const token = customer.genrateToken();
  res.cookie("token", token);
  res.json({ customer: customer, token: token });
};

module.exports.logincustomer = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  let { email, password } = req.body;
  const customer = await customerModel.findOne({ email }).select("+password");
  if (!customer) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, customer.password);
  if (!checkPassword) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const token = customer.genrateToken();
  res.cookie("token", token);
  res.json({ customer: customer, token: token });
};

module.exports.getcustomerDashboard = function (req, res) {
  res.status(200).json({ customer: req.customer });
};

module.exports.updateCustomer = async function (req, res) {
  const { _id, fullname, email, contactNo, profileImage } = req.body;
  try {
    const updatedCustomer = await customerServices.Updatecustomer({
      _id,
      fullname,
      email,
      contactNo,
      profileImage,
    });
    res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer", details: error.message });
  }
};
