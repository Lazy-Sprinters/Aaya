const vonage = require('@vonage/server-sdk')

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sendOtp = async (from, to, text) => {
    const vonage = new Vonage({
        apiKey: process.env.VonageAPIKEY,
        apiSecret: process.env.VonageAPISECRET
    })
    await vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("OTP sent successfully.");
            } else {
                console.log(`OTP failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

module.exports = sendOtp

