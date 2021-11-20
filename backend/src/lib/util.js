exports.responseUtil = (statusCode, message, data) => {
  return {
    status: statusCode,
    message: message,
    data: data,
  };
};