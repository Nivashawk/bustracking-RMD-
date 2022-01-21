const AdminModel = require("../model/admin.model");
const response = require("../response/response");
const messageResponse = require("../response/messages");


// ### create Student document ###

const create = async (req, res) => {
  const admin = new AdminModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
    password: req.body.password
  });
  try {
    const totalNumberOfDocuments = await AdminModel.estimatedDocumentCount();
    if (totalNumberOfDocuments === 0) {
      await admin.save();
      const responseObject = response.success(messageResponse.Insert);
      return res.status(200).json(responseObject);
    } else {
      const findDocumentWithUserId = await AdminModel.find(
          {"phoneNumber" : req.body.phoneNumber}
      );
      if (findDocumentWithUserId.length !== 0) {
        const responseObject = response.error(
          messageResponse.alreadyExits("phoneNumber" , req.body.phoneNumber)
        );
        res.status(200).json(responseObject);
      } else if (findDocumentWithUserId.length === 0) {
        await admin.save();
        const responseObject = response.success(messageResponse.Insert);
        return res.status(200).json(responseObject);
      }
    }
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### Admin Login ###

const login = async (req, res) => {
    try {
      const totalNumberOfDocuments = await AdminModel.estimatedDocumentCount();
      if (totalNumberOfDocuments === 0) {
        const responseObject = response.error(messageResponse.emptyDatabase);
        res.status(200).json(responseObject);
      } else {
        const loginWithIdNumberAndPassword = await AdminModel.find(
         {"$and" : [{"userName" : req.body.userName},{"password" : req.body.password}]}
        );
        if (loginWithIdNumberAndPassword.length !== 0) {
            const responseObject = response.success(messageResponse.login);
            return res.status(200).json(responseObject);
        } else {
          const responseObject = response.error(
            messageResponse.invalidCredentials(
              req.body.userName,
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


module.exports = {
    create,
    login
  };