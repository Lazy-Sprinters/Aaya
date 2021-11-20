const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  phoneNumberVerified: {
    type: Boolean,
    required: true,
  },
  policePhone: {
    type: Number,
    required: true,
  },
  emergencyPhone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  aadhaarURL: {
    type: String,
    required: true,
  },
  displayPictureURL: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
