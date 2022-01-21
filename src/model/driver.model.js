const mongoose = require("mongoose");
const config = require("../config/server.config");
const collectionName = config.driverCollection;

const driverSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  idNumber: {
    type: Number,
    require: true,
  },
  bloodGroup: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const DriverModel = mongoose.model("driver", driverSchema, collectionName);
module.exports = DriverModel;
