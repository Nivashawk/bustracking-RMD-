const mongoose = require("mongoose");
const config = require("../config/server.config");
const collectionName = config.busCollection;

const busSchema = mongoose.Schema({
  busNumber: {
    type: String,
    require: true,
  },
  busIdNumber: {
    type: String,
    require: true,
  },
  busRoute: {
    type: String,
    require: true,
  },
  busDriverName: {
    type: String,
    require: true,
  }
});

const BusModel = mongoose.model("bus", busSchema, collectionName);
module.exports = BusModel;
