const DriverModel = require("../model/driver.model");
const BusModel = require("../model/bus.model");
const response = require("../response/response");
const messageResponse = require("../response/messages");
const requiredFields = require("../model/fields");
var nodemailer = require('nodemailer');
const config = require("../config/server.config");

// ### create Student document ###

const create = async (req, res) => {
  const driver = new DriverModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    idNumber: req.body.idNumber,
    busNumber: req.body.busNumber,
    password: req.body.password,
    isAssigned: false
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
            const checkIdNumberInBusCollection = await BusModel.find(
              {"busDriverId" : loginWithIdNumberAndPassword[0].idNumber}
            )
            if (checkIdNumberInBusCollection.length !== 0) {
            const responseObject = response.success(messageResponse.login, result= { "idNumber" : loginWithIdNumberAndPassword[0].idNumber, "type": "driver"});
            return res.status(200).json(responseObject);
            }
            else{
              const responseObject = response.error(
                messageResponse.notAssigned(
                  loginWithIdNumberAndPassword[0].name
                )
              );
              return res.status(200).json(responseObject);
            }
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

// ### search driver Details using busId in the collection ###

const driverDetail = async (req, res) => {
  try {
    const result = await DriverModel.find(
      {"idNumber" : req.body.idNumber}
    );
    if (result.length !== 0) {
      const responseObject = response.success(
        messageResponse.getOne("driver detail"),
        result
      );
      return res.status(200).json(responseObject);
    } else {
      const responseObject = response.error(
        messageResponse.noResult("driver detail")
      );
      res.status(200).json(responseObject);
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
        const result = await DriverModel.find({"isAssigned" : false})
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

// ### assign Driver in the collection ###

const assignDriver = async (req, res) => {
  try {
      await BusModel.updateOne(
        {"busIdNumber" : req.body.busIdNumber},
        {"$set" : {"busDriverName" : req.body.busDriverName, "busDriverId" : req.body.busDriverId, "isAssigned" : true}}
      )
      await DriverModel.updateOne(
        {"idNumber" : req.body.busDriverId},
        { "$set" : {"isAssigned" : true}}
      )
      const responseObject = response.success(
          messageResponse.updateOne("driver/bus"),
        );
        return res.status(200).json(responseObject);
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### Unassign Driver in the collection ###

const unassignDriver = async (req, res) => {
  try {
      await BusModel.updateOne(
        {"busIdNumber" : req.body.busIdNumber},
        {"$set" : {"busDriverName" : "", "busDriverId" : "", "isAssigned" : false}}
      )
      await DriverModel.updateOne(
        {"idNumber" : req.body.busDriverId},
        { "$set" : {"isAssigned" : false}}
      )
      const responseObject = response.success(
          messageResponse.updateOne("driver/bus"),
        );
        return res.status(200).json(responseObject);
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### send email from app ###

const sendEmail = async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email,
        pass: config.password
      }
    });

    var mailOptions = {
      from: 'krithickvenketesanguru@gmail.com',
      to: 'krithickvenketesanguru@gmail.com',
      subject: `emergency alert from driver ${req.body.name}`,
      text: `
      emergency type : ${req.body.type}
      description : ${req.body.description}
      `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        const responseObject = response.success(
          messageResponse.emailSent(),
          info.response,
        );
        return res.status(200).json(responseObject);
      }
    });
    
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};


module.exports = {
    create,
    login,
    driverDetail,
    driverList,
    assignDriver,
    unassignDriver,
    sendEmail
  };