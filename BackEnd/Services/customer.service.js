const customerModel = require("../models/customer.model");

module.exports.Createcustomer = async ({
  fullname,
  email,
  password,
  contactNo,
}) => {
  if (!fullname || !email || !password) {
    throw new Error("All Fields Are Required");
  }
  const customer = await customerModel.create({
    fullname,
    email,
    password,
    contactNo,
  });
  return customer;
};

module.exports.Updatecustomer = async ({
  _id,
  fullname,
  email,
  contactNo,
  profileImage,
}) => {
  const customer = await customerModel.findById(_id);
  if (!customer) {
    throw new Error("Customer not found");
  }
  if (fullname !== undefined) customer.fullname = fullname;
  if (email !== undefined) customer.email = email;
  if (contactNo !== undefined) customer.contactNo = contactNo;
  if (profileImage !== undefined) customer.profileImage = profileImage;
  await customer.save();
  return customer;
};
