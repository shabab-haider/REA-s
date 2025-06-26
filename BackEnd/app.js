const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectToDB = require("./config/db.config");
ConnectToDB();
const customerRouter = require("./Routes/Customer.routes");
const vendorRouter = require("./Routes/Vendor.routes");
const bookingRouter = require("./Routes/Booking.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies (withCredentials)
  })
);
app.use(cookieParser());

app.use("/customers", customerRouter);
app.use("/vendors", vendorRouter);
app.use("/bookings", bookingRouter);

module.exports = app;
