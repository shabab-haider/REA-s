const jwt = require("jsonwebtoken");
const customerModel = require("../models/customer.model");
const vendorModel = require("../models/vendor.model");

module.exports.protectVendor = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await vendorModel.findById(decoded.id);
    if (!vendor) throw new Error("Vendor not found");
    req.user = vendor;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports.customerAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await customerModel.findOne({ _id: decode.id });
    if (!customer) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.customer = customer;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports.vendorAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await vendorModel.findOne({ _id: decode.id });
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.vendor = vendor;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};
