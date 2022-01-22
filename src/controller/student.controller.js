const StudentModel = require("../model/student.model");
const response = require("../response/response");
const messageResponse = require("../response/messages");


// ### create Student document ###

const create = async (req, res) => {
  const student = new StudentModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    idNumber: req.body.idNumber,
    bloodGroup: req.body.bloodGroup,
    busIdNumber: req.body.busIdNumber,
    password: req.body.password
  });
  try {
    const totalNumberOfDocuments = await StudentModel.estimatedDocumentCount();
    if (totalNumberOfDocuments === 0) {
      await student.save();
      const responseObject = response.success(messageResponse.Insert);
      return res.status(200).json(responseObject);
    } else {
      const findDocumentWithUserId = await StudentModel.find(
          {"idNumber" : req.body.idNumber}
      );
      if (findDocumentWithUserId.length !== 0) {
        const responseObject = response.error(
          messageResponse.alreadyExits("idNumber" , req.body.idNumber)
        );
        res.status(200).json(responseObject);
      } else if (findDocumentWithUserId.length === 0) {
        await student.save();
        const responseObject = response.success(messageResponse.Insert);
        return res.status(200).json(responseObject);
      }
    }
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

// ### Student Login ###

const login = async (req, res) => {
    try {
      const totalNumberOfDocuments = await StudentModel.estimatedDocumentCount();
      if (totalNumberOfDocuments === 0) {
        const responseObject = response.error(messageResponse.emptyDatabase);
        res.status(200).json(responseObject);
      } else {
        const loginWithIdNumberAndPassword = await StudentModel.find(
         {"$and" : [{"idNumber" : req.body.idNumber},{"password" : req.body.password}]}
        );
        if (loginWithIdNumberAndPassword.length !== 0) {
            const responseObject = response.success(messageResponse.login, result= { "idNumber" : loginWithIdNumberAndPassword[0].idNumber, "type": "student"});
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

// ### search students Details using busId in the collection ###

const studentDetail = async (req, res) => {
  try {
    const result = await StudentModel.find(
      {"idNumber" : req.body.idNumber}
    );
    if (result.length !== 0) {
      const responseObject = response.success(
        messageResponse.getOne("student detail"),
        result
      );
      return res.status(200).json(responseObject);
    } else {
      const responseObject = response.error(
        messageResponse.noResult("student detail")
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
    studentDetail
  };