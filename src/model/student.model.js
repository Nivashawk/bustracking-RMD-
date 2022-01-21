const mongoose = require("mongoose");
const config = require("../config/server.config");
const collectionName = config.studentCollection;

const studentSchema = mongoose.Schema({
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
  busIdNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }
});

const StudentModel = mongoose.model("student", studentSchema, collectionName);
module.exports = StudentModel;
