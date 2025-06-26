const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const vendorController = require("../Controllers/vendor.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");
const { protectVendor } = require("../Middlewares/Auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("wrong email"),
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("firtname must be 3 characters long"),
    body("Password")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ],
  vendorController.registervendor
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("wrong email"),
    body("Password")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ],
  vendorController.loginvendor
);

router.get(
  "/dashboard",
  authMiddleware.vendorAuth,
  vendorController.getvendorDashboard
);

router.post("/venue", protectVendor, vendorController.createVenueService);

router.post(
  "/transportation",
  protectVendor,
  vendorController.createTransportationService
);

router.post("/salon", protectVendor, vendorController.createSalonService);

router.post(
  "/photography",
  protectVendor,
  vendorController.createPhotographyService
);

router.put("/packages", protectVendor, vendorController.updateVendorPackages);

router.get("/photographers", vendorController.getAllPhotographers);

router.get("/salons", vendorController.getAllSalons);

router.get("/transportation", vendorController.getAllTransportServices);

router.get("/venues", vendorController.getAllVenues);

router.get("/:vendorId/packages", vendorController.getVendorPackages);

router.get(
  "/notifications",
  protectVendor,
  vendorController.getVendorNotifications
);

router.post("/bookedDates/add", protectVendor, vendorController.addBlockedDate);
router.post(
  "/bookedDates/remove",
  protectVendor,
  vendorController.removeBlockedDate
);

router.get("/bookedDates", protectVendor, vendorController.getBlockedDates);

router.post("/available-vendors", vendorController.getAvailableVendors);

router.post("/packages", vendorController.getVendorPackages);

router.post("/packages/delete", vendorController.deleteVendorPackage);

router.post("/packages/add", vendorController.addVendorPackage);

module.exports = router;
