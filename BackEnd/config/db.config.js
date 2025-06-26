const mongoose = require("mongoose");
const ConnectToDB = () => {
  mongoose.connect(`${process.env.MONGO_URI}/REA's`).then(() => {
    console.log("Connected To DB✅");
  });
};

module.exports = ConnectToDB;
