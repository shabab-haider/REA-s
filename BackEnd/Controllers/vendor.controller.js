const { validationResult } = require("express-validator");
const vendorService = require("../Services/vendor.service");
const vendorModel = require("../models/vendor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const venueModel = require("../models/venue.model");
const transportationModel = require("../models/transportation.model");
const salonModel = require("../models/salon.model");
const photographyModel = require("../models/photography.model");
const bookingModel = require("../models/booking.model");

module.exports.registervendor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(400).json({ errors: err.array() });
  }
  let { fullname, email, password, serviceType, phoneNumber } = req.body;
  const hash = await vendorModel.hashPassword(password);
  const vendor = await vendorService.Createvendor({
    fullname,
    email,
    password: hash,
    serviceType,
    phoneNumber,
  });
  const token = vendor.genrateToken();
  res.cookie("token", token);

  res.json({ vendor: vendor, token: token });
};

module.exports.loginvendor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(422).json({ errors: err.array() });
  }
  let { email, password } = req.body;
  const vendor = await vendorModel.findOne({ email }).select("+password");
  if (!vendor) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, vendor.password);
  if (!checkPassword) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const token = vendor.genrateToken();
  res.cookie("token", token);
  res.json({ vendor: vendor, token: token });
};

module.exports.getvendorDashboard = function (req, res) {
  res.status(200).json({ vendor: req.vendor });
};

module.exports.createVenueService = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const {
      venueName,
      location,
      guestCapacity,
      priceRange,
      Description,
      Image,
      features,
    } = req.body;

    // Create new venue document
    const newVenue = await venueModel.create({
      venueName,
      location,
      guestCapacity,
      priceRange,
      Description,
      Image,
      features,
    });

    // Update vendor with this new service
    const vendor = await vendorModel.findByIdAndUpdate(vendorId, {
      service: {
        serviceName: "venue",
        serviceDetails: newVenue._id,
      },
    });

    res.status(201).json({
      message: "Venue service created successfully",
      vendor,
    });
  } catch (error) {
    console.error("Error creating venue service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createTransportationService = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const {
      BusinessName,
      speciality,
      location,
      experience,
      vehicleType,
      capacity,
      priceRange,
      Description,
      Image,
      servicesOffered,
    } = req.body;

    const newTransport = await transportationModel.create({
      BusinessName,
      speciality,
      location,
      experience,
      vehicleType,
      capacity,
      priceRange,
      Description,
      Image,
      servicesOffered,
    });

    const vendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      {
        service: {
          serviceName: "transportation",
          serviceDetails: newTransport._id,
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Transportation service created successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create transportation service",
      error: error.message,
    });
  }
};

module.exports.createSalonService = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const {
      salonName,
      speciality,
      location,
      image,
      experience,
      priceRange,
      available,
      services,
      openingHours,
      Description,
      servicesOffered,
    } = req.body;

    const newSalon = await salonModel.create({
      salonName,
      speciality,
      location,
      Image: image, // this maps to the schema field 'Image'
      experience,
      priceRange,
      openingHours,
      Description,
      servicesOffered,
    });

    const vendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      {
        service: {
          serviceName: "salon",
          serviceDetails: newSalon._id,
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Salon service created successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create salon service",
      error: error.message,
    });
  }
};

module.exports.createPhotographyService = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const {
      photographerName,
      photographySpeciality,
      location,
      experience,
      priceRange,
      Description,
      profileImage,
      portfolioImage,
      services,
    } = req.body;

    const newPhotography = await photographyModel.create({
      photographerName,
      photographySpeciality,
      location,
      experience,
      priceRange,
      Description,
      profileImage,
      portfolioImage,
      services,
    });

    const vendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      {
        service: {
          serviceName: "photography",
          serviceDetails: newPhotography._id,
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Photography service created successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create photography service",
      error: error.message,
    });
  }
};

module.exports.updateVendorPackages = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const { packages } = req.body;

    if (!Array.isArray(packages) || packages.length === 0) {
      return res.status(400).json({ message: "Packages array is required" });
    }

    const vendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      { packages },
      { new: true }
    );

    res.status(200).json({
      message: "Packages updated successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update packages",
      error: error.message,
    });
  }
};

module.exports.getAllPhotographers = async (req, res) => {
  try {
    const vendors = await vendorModel
      .find({ "service.serviceName": "photography" })
      .populate("service.serviceDetails");

    const photographers = vendors.map((vendor) => {
      const details = vendor.service.serviceDetails;

      return {
        id: vendor._id,
        name: details.photographerName,
        speciality: details.photographySpeciality,
        location: details.location,
        image: details.profileImage,
        portfolioImage: details.portfolioImage,
        experience: details.experience + " Years",
        priceRange: `PKR ${details.priceRange.min} - ${details.priceRange.max}`,
        available: true,
        services: details.services,
      };
    });

    res.status(200).json({ photographers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve photographers",
      error: error.message,
    });
  }
};

module.exports.getAllSalons = async (req, res) => {
  try {
    const vendors = await vendorModel
      .find({ "service.serviceName": "salon" })
      .populate("service.serviceDetails")
      .lean();

    const salons = vendors.map(({ _id, service }) => {
      const s = service.serviceDetails;

      return {
        id: _id,
        name: s.salonName,
        speciality: s.speciality,
        location: s.location,
        salonImage: s.Image,
        experience: s.experience + " Years",
        priceRange: `PKR ${s.priceRange.min} - ${s.priceRange.max}`,
        available: true,
        services: s.servicesOffered,
        openTime: `${s.openingHours.start} - ${s.openingHours.end}`,
      };
    });

    res.status(200).json({ salons });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve salon data",
      error: error.message,
    });
  }
};

module.exports.getAllTransportServices = async (req, res) => {
  try {
    const vendors = await vendorModel
      .find({ "service.serviceName": "transportation" })
      .populate("service.serviceDetails")
      .lean();

    const transportation = vendors.map(({ _id, service }) => {
      const t = service.serviceDetails;

      return {
        id: _id,
        name: t.BusinessName,
        speciality: t.speciality,
        location: t.location,
        vehicleImage: t.Image,
        experience: t.experience + " Years",
        priceRange: `PKR ${t.priceRange.min} - ${t.priceRange.max}`,
        available: true,
        services: t.servicesOffered,
        vehicleType: t.vehicleType,
        capacity: t.capacity,
      };
    });

    res.status(200).json({ transportation });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve transportation data",
      error: error.message,
    });
  }
};

module.exports.getAllVenues = async (req, res) => {
  try {
    const vendors = await vendorModel
      .find({ "service.serviceName": "venue" })
      .populate("service.serviceDetails")
      .lean();

    const venues = vendors.map(({ _id, service }) => {
      const v = service.serviceDetails;

      return {
        id: _id,
        name: v.venueName,
        location: v.location,
        image: v.Image,
        capacity: v.guestCapacity,
        priceRange: `PKR ${v.priceRange.min} - ${v.priceRange.max}`,
        available: true,
      };
    });

    res.status(200).json({ venues });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve venue data",
      error: error.message,
    });
  }
};

module.exports.getVendorPackages = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const vendor = await vendorModel
      .findById(vendorId)
      .populate("service.serviceDetails");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const formattedPackages = vendor.packages.map((pkg) => ({
      title: pkg.title,
      description: pkg.Description,
      price: `PKR ${pkg.Pricing.toLocaleString()}`,
    }));

    res.status(200).json({
      vendorId: vendor._id,
      serviceType: vendor.service.serviceName,
      packages: formattedPackages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch vendor packages",
      error: error.message,
    });
  }
};

module.exports.getVendorNotifications = async (req, res) => {
  try {
    const vendor = await vendorModel
      .findById(req.user._id)
      .populate("notifications");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const notifications = vendor.notifications.map((booking) => ({
      id: booking._id,
      packageName: booking.title,
      pricing: booking.pricing,
      eventDate: booking.date,
      customerPhone: booking.contact,
      eventDetails: booking.description,
      venue: booking.location,
      status: booking.status,
    }));

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// POST /vendors/bookedDates/add
module.exports.addBlockedDate = async (req, res) => {
  try {
    const vendor = req.user; // ✅ using req.user instead of req.userId
    console.log(vendor);
    const { date } = req.body;
    if (!date) return res.status(400).json({ message: "Date is required" });

    if (!vendor.bookedDates.includes(date)) {
      vendor.bookedDates.push(date);
      await vendor.save();
    }

    res.status(200).json({ message: "Date blocked successfully" });
  } catch (error) {
    console.error("Error in addBlockedDate:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /vendors/bookedDates/remove
module.exports.removeBlockedDate = async (req, res) => {
  try {
    const vendor = req.user;
    const { date } = req.body;
    if (!date) return res.status(400).json({ message: "Date is required" });

    vendor.bookedDates = vendor.bookedDates.filter((d) => d !== date);
    await vendor.save();

    res.status(200).json({ message: "Date unblocked successfully" });
  } catch (error) {
    console.error("Error in removeBlockedDate:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getBlockedDates = async (req, res) => {
  try {
    const vendor = await vendorModel.findById(req.user._id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ bookedDates: vendor.bookedDates });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch booked dates",
      error: error.message,
    });
  }
};

// POST /vendors/available-vendors
module.exports.getAvailableVendors = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const allVendors = await vendorModel.find();

    const vendorsWithAvailability = allVendors.map((vendor) => {
      const isBooked = vendor.bookedDates.includes(date);
      return {
        id: vendor._id,
        fullname: vendor.fullname,
        serviceType: vendor.service?.serviceName || null,
        available: !isBooked,
      };
    });

    res.status(200).json({ vendors: vendorsWithAvailability });
  } catch (error) {
    console.error("Error checking vendor availability:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getVendorPackages = async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    const vendor = await vendorModel.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const packages = vendor.packages;

    res
      .status(200)
      .json({ message: "Packages fetched successfully", packages });
  } catch (error) {
    console.error("Error in getVendorPackages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteVendorPackage = async (req, res) => {
  try {
    const { vendorId, packageId } = req.body;

    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      { $pull: { packages: { _id: packageId } } },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      message: "Package deleted successfully",
      packages: updatedVendor.packages,
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addVendorPackage = async (req, res) => {
  try {
    const { vendorId, title, description, price } = req.body;

    if (!vendorId || !title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPackage = {
      title,
      Description: description,
      Pricing: parseFloat(price),
    };

    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      { $push: { packages: newPackage } },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(201).json({
      message: "Package added successfully",
      packages: updatedVendor.packages,
    });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};