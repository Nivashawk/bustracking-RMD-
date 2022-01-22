const BusModel = require("../model/bus.model");
const DriverModel = require("../model/driver.model");
const response = require("../response/response");
const messageResponse = require("../response/messages");
const requiredFields = require("../model/fields");

// ### create Student document ###

const create = async (req, res) => {
  const bus = new BusModel({
    busNumber: req.body.busNumber,
    busIdNumber: req.body.busIdNumber,
    busRoute: req.body.busRoute,
    busDriverName: "",
    busDriverId: "",
    isAssigned: false
  });
  try {
    const totalNumberOfDocuments = await BusModel.estimatedDocumentCount();
    if (totalNumberOfDocuments === 0) {
      await bus.save();
      const responseObject = response.success(messageResponse.Insert);
      return res.status(200).json(responseObject);
    } else {
      const findDocumentWithUserId = await BusModel.find(
          {"busNumber" : req.body.busNumber}
      );
      if (findDocumentWithUserId.length !== 0) {
        const responseObject = response.error(
          messageResponse.alreadyExits("busNumber" , req.body.busNumber)
        );
        res.status(200).json(responseObject);
      } else if (findDocumentWithUserId.length === 0) {
        await bus.save();
        const responseObject = response.success(messageResponse.Insert);
        return res.status(200).json(responseObject);
      }
    }
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### search Bus Details using busId in the collection ###

const busDetail = async (req, res) => {
    try {
      const result = await BusModel.find(
        {"busIdNumber" : req.body.busIdNumber}
      );
      if (result.length !== 0) {
        const responseObject = response.success(
          messageResponse.getOne("bus detail"),
          result
        );
        return res.status(200).json(responseObject);
      } else {
        const responseObject = response.error(
          messageResponse.noResult("bus detail")
        );
        res.status(200).json(responseObject);
      }
    } catch (error) {
      const responseObject = response.error(error.message);
      res.status(200).json(responseObject);
    }
  };

// ### search Bus Details using busId in the collection ###

const editBusDetail = async (req, res) => {
    try {
      const result = await BusModel.updateOne(
        {"busIdNumber" : req.body.busIdNumber},
        {
            "busNumber": req.body.busNumber,
            "busIdNumber": req.body.busIdNumber,
            "busRoute": req.body.busRoute,
            "busDriverName": req.body.busDriverName
        }
      );
      if (result.length !== 0) {
        const responseObject = response.success(
          messageResponse.updateOne("bus"),
        );
        return res.status(200).json(responseObject);
      } else {
        const responseObject = response.error(
          messageResponse.noResult("bus")
        );
        res.status(200).json(responseObject);
      }
    } catch (error) {
      const responseObject = response.error(error.message);
      res.status(200).json(responseObject);
    }
  };

// ### list of all Buses in the collection ###

const busList = async (req, res) => {
    try {
      const { page = 1, limit = 10, busIdNumber } = req.body;
      if (busIdNumber === null || busIdNumber === "") {
        const result = await BusModel.find({})
          .select(requiredFields.busFields)
          .limit(limit * 1)
          .skip((page - 1) * limit);
        if (result.length !== 0) {
          const responseObject = response.success(
            messageResponse.getAll("buses"),
            result,
            result.length
          );
          return res.status(200).json(responseObject);
        } else {
          const responseObject = response.error(
            messageResponse.noResult("buses")
          );
          res.status(200).json(responseObject);
        }
      } else {
        const result = await BusModel.find(
          {"busIdNumber" : req.body.busIdNumber}
        ).select(requiredFields.busFields);
        if (result.length !== 0) {
          const responseObject = response.success(
            messageResponse.getOne("buses"),
            result
          );
          return res.status(200).json(responseObject);
        } else {
          const responseObject = response.error(
            messageResponse.noResult("buses")
          );
          res.status(200).json(responseObject);
        }
      }
    } catch (error) {
      const responseObject = response.error(error.message);
      res.status(200).json(responseObject);
    }
  };

// ### list of all assignedBuses in the collection ###

const assignedBusList = async (req, res) => {
  try {
    const { page = 1, limit = 10, busIdNumber } = req.body;
    if (busIdNumber === null || busIdNumber === "") {
      const result = await BusModel.find({"isAssigned" : true})
        .select(requiredFields.busFields)
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (result.length !== 0) {
        const responseObject = response.success(
          messageResponse.getAll("assigned buses"),
          result,
          result.length
        );
        return res.status(200).json(responseObject);
      } else {
        const responseObject = response.error(
          messageResponse.noResult("assigned buses")
        );
        res.status(200).json(responseObject);
      }
    } else {
      const result = await BusModel.find(
        {"busIdNumber" : req.body.busIdNumber, "isAssigned" : true}
      ).select(requiredFields.busFields);
      if (result.length !== 0) {
        const responseObject = response.success(
          messageResponse.getOne("assigned buses"),
          result
        );
        return res.status(200).json(responseObject);
      } else {
        const responseObject = response.error(
          messageResponse.noResult("assigned buses")
        );
        res.status(200).json(responseObject);
      }
    }
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

module.exports = {
    create,
    busDetail,
    editBusDetail,
    busList,
    assignedBusList
  };