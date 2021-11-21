const vonage = require("@vonage/server-sdk");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sendOtp = async (from, to, text) => {
  const vonage = new vonage({
    apiKey: process.env.VonageAPIKEY,
    apiSecret: process.env.VonageAPISECRET,
  });
  const response = await vonage.message.sendSms(from, to, text);
  console.log(response);
};

module.exports = {sendOtp};
