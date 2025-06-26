const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const customerController = require("../Controllers/customer.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 charaters long"),
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("fullname must be 3 characters long"),
  ],
  customerController.registercustomer
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 charaters long"),
  ],
  customerController.logincustomer
);

router.get(
  "/dashboard",
  authMiddleware.customerAuth,
  customerController.getcustomerDashboard
);

module.exports = router;

router.post(
  "/update",
  [
    body("fullname").isLength({ min: 3 }).withMessage("invalid Username"),
    body("contactNo").isLength({ min: 11 }).withMessage("invalid contactNo"),
    body("email").isEmail().withMessage("invalid Email"),
  ],
  customerController.updateCustomer
);
