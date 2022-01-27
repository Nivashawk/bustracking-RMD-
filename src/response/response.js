// RESPONSE HANDLED HERE

const error = (message) => {
    const response = {
      code: 201,
      status: "failure",
      message,
    };
    return response;
  };
  
  const success = (message, result, documentCount, isNext) => {
    const response = {
      code: 200,
      status: "success",
      message,
      documentCount,
      nextPage : isNext,
      result,
    };
    return response;
  };
  
  module.exports = {
    error,
    success,
  };
  