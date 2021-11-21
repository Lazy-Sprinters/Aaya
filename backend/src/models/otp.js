const mongoose = require("mongoose");
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const otpSchema = new mongoose.Schema({
  entity:{
    type: String,
    required: true,
    trim: true
  },
  otp:{
    type: Number,
    required: true,
  }
},
  timestamps
);

const Otp = mongoose.model("otp", otpSchema);

module.exports = Otp;
