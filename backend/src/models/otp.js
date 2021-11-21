const mongoose = require("mongoose");
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const otpSchema = new mongoose.Schema({
  entity:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  otp:{
    type: Number,
    required: true,
  }
},{
  timestamps: true
}
);

otpSchema.statics.findCreateOrUpdate = async function (entity, otp){
  let otpObj = await Otp.findOne({entity: entity});
  if (!otpObj){
    const newOtp = new Otp({entity: entity, otp: otp});
    await newOtp.save();
  }else{
    otpObj.otp = otp;
    await otpObj.save();
  }
}

const Otp = mongoose.model("otp", otpSchema);

module.exports = Otp;
