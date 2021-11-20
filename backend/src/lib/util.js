exports.responseUtil = (statusCode, message, data) => {
  return {
    status: statusCode,
    message: message,
    data: data,
  };
};

exports.removeExtraKeysFromResponse = (data) => {
  delete data.password;
  delete data.phoneNumberVerified;
  delete data.emailVerified;
  delete data.blocked;
  return data;
}