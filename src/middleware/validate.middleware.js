const validator = require("../helper/validate.helper");

// validation for Login


const baseValidator = (paramType,validationRule,res, next) => {
  validator(paramType, validationRule, {}, (err, status) => {
    console.log(Object.keys(err).length);
    if (!status) {
      res.status(200).send({
        code: 201,
        status: "failure",
        message: "validation error",
        error: err["errors"],
      });
    } else {
      next();
    }
  });
};

const login = (req, res, next) => {
  const validationRule = {
    userName: "required|string",
    password: "required|string",
    notificationToken: "required|string",
  };
  baseValidator(req.body,validationRule,res, next);
  
};

// validation for creating customer

const createCustomer = (req, res, next) => {
  const validationRule = {
    customerId: "required|string",
    name: "required|string",
    phoneNumber: "required|integer",
    address: "required|string",
    latitude: "required|string",
    longitude: "required|string",
    referer: "required|string",
    price: "required|integer",
    handCash: "required|integer",
    productItem: "required|string",
    productDescription: "required|string",
  };
  baseValidator(req.query,validationRule,res, next);
};

// validation for search customer

const searchCustomer = (req, res, next) => {
  const validationRule = {
    customerId: "required|string",
  };
  baseValidator(req.body,validationRule,res, next);
};

// validation for creating service

const createService = (req, res, next) => {
  const validationRule = {
    serviceId: "required|string",
    customerId: "required|string",
    name: "required|string",
    phoneNumber: "required|integer",
    workDone: "required|string",
    parts: "required|string",
    price: "required|integer",
    handCash: "required|integer",
    raw: "required|integer",
    aro: "required|integer",
    rejectionRate: "required|integer",
    productItem: "required|string",
    productDescription: "required|string",
  };
  baseValidator(req.query,validationRule,res, next);
};

// validation for search service

const searchService = (req, res, next) => {
  const validationRule = {
    customerId: "required|string",
  };
  baseValidator(req.body,validationRule,res, next);
};

module.exports = {
  login,
  createCustomer,
  searchCustomer,
  createService,
  searchService,
};
