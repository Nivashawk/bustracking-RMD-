// RESPONSE HANDLED HERE

const error = (message) => {
    const response = {
      code: 201,
      status: "failure",
      message,
    };
    return response;
  };
  
  const success = (message, result, documentCount) => {
    const response = {
      code: 200,
      status: "success",
      message,
      documentCount,
      result,
    };
    return response;
  };
  
  module.exports = {
    error,
    success,
  };
  