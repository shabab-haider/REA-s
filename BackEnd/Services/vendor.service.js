const vendorModel = require("../models/vendor.model");

module.exports.Createvendor = async ({
  fullname,
  email,
  password,
  serviceType,
  phoneNumber,
}) => {
  if (!fullname || !email || !password || !serviceType || !phoneNumber) {
    throw new Error("All Fields Are Required");
  }
  const vendor = await vendorModel.create({
    fullname,
    email,
    password,
    service: {
      serviceName: serviceType,
    },
    phoneNumber,
  });
  return vendor;
};
