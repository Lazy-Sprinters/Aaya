const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumberVerified: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  pinCode: {
    type: String,
    required: true,
    trim: true
  },
  policePhone: {
    type: String,
    required: true,
    trim: true
  },
  emergencyPhone: {
    type: String,
    required: true,
    trim: true
  },
  aadhaarURL: {
    type: String,
    required: true,
  },
  displayPictureURL: {
    type: String,
    required: true,
  },
  patientDescription: {
    type: String,
    required: true,
    trim: true
  },
  patientNotes: {
    type: String,
    required: true,
    trim: true
  },
  requirement: {
    type: String,
    required: true,
    trim: true
  },
  clientId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
