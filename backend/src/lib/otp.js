const vonage = require("@vonage/server-sdk");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sendOtp = async (from, to, text) => {
  const vonage = new vonage({
    apiKey: process.env.VonageAPIKEY,
    apiSecret: process.env.VonageAPISECRET,
  });
  await vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("OTP sent successfully.");
      } else {
        console.log(
          `OTP failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};

const getOtp = () => {
  const val = Math.floor(Math.random() * 1000000);
  if (val.toString().length == 5) {
    val *= 10;
  }
  return val;
};

module.exports = {sendOtp, getOtp};
