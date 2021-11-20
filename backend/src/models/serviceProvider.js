const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
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
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
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
  serviceType: {
    type: [String], //add validation that service provider should not be a client
    required: true,
  },
  aadhaarURL: {
    type: String,
    required: true,
  },
  certificateURL: {
    type: String, //add validation on signup level to check nurse is present in serviceType, then certificate URL is must
  },
  displayPictureURL: {
    type: String,
    required: true,
  },
  hourlyFees:{
    type: Number,
    required: true,
  }
});

const ServiceProvider = mongoose.model(
  "serviceProvider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
