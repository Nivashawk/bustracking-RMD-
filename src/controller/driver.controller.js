const DriverModel = require("../model/driver.model");
const response = require("../response/response");
const messageResponse = require("../response/messages");
const requiredFields = require("../model/fields");

// ### create Student document ###

const create = async (req, res) => {
  const driver = new DriverModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    idNumber: req.body.idNumber,
    busNumber: req.body.busNumber,
    password: req.body.password
  });
  try {
    const totalNumberOfDocuments = await DriverModel.estimatedDocumentCount();
    if (totalNumberOfDocuments === 0) {
      await driver.save();
      const responseObject = response.success(messageResponse.Insert);
      return res.status(200).json(responseObject);
    } else {
      const findDocumentWithUserId = await DriverModel.find(
          {"idNumber" : req.body.idNumber}
      );
      if (findDocumentWithUserId.length !== 0) {
        const responseObject = response.error(
          messageResponse.alreadyExits("idNumber" , req.body.idNumber)
        );
        res.status(200).json(responseObject);
      } else if (findDocumentWithUserId.length === 0) {
        await driver.save();
        const responseObject = response.success(messageResponse.Insert);
        return res.status(200).json(responseObject);
      }
    }
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### Driver Login ###

const login = async (req, res) => {
    try {
      const totalNumberOfDocuments = await DriverModel.estimatedDocumentCount();
      if (totalNumberOfDocuments === 0) {
        const responseObject = response.error(messageResponse.emptyDatabase);
        res.status(200).json(responseObject);
      } else {
        const loginWithIdNumberAndPassword = await DriverModel.find(
         {"$and" : [{"idNumber" : req.body.idNumber},{"password" : req.body.password}]}
        );
        if (loginWithIdNumberAndPassword.length !== 0) {
            const responseObject = response.success(messageResponse.login);
            return res.status(200).json(responseObject);
        } else {
          const responseObject = response.error(
            messageResponse.invalidCredentials(
              req.body.idNumber,
              req.body.password
            )
          );
          return res.status(200).json(responseObject);
        }
      }
    } catch (error) {
      const responseObject = response.error(error.message);
      res.status(200).json(responseObject);
    }
  };


// ### list of all Driver in the collection ###

const driverList = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.body;
        const result = await DriverModel.find({})
          .select(requiredFields.driverFields)
          .limit(limit * 1)
          .skip((page - 1) * limit);
        if (result.length !== 0) {
          const responseObject = response.success(
            messageResponse.getAll("drivers"),
            result,
            result.length
          );
          return res.status(200).json(responseObject);
        } else {
          const responseObject = response.error(
            messageResponse.noResult("drivers")
          );
          res.status(200).json(responseObject);
        }
    } catch (error) {
      const responseObject = response.error(error.message);
      res.status(200).json(responseObject);
    }
  };


module.exports = {
    create,
    login,
    driverList
  };