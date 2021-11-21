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

exports.getOtp = () => {
  const val = Math.floor(Math.random() * 1000000);
  if (val.toString().length == 5) {
    val *= 10;
  }
  return val;
};