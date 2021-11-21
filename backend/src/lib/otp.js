const Vonage = require("@vonage/server-sdk");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sendOtp =  (from, to, text) => {
  const vonage = new Vonage({
    apiKey: process.env.VonageAPIKEY,
    apiSecret: process.env.VonageAPISECRET,
  });
  vonage.message.sendSms(from, to, text);
  // console.log(response);
};

module.exports = {sendOtp};
