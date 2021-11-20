const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  phoneNumberVerified: {
    type: Boolean,
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
  policePhone: {
    type: Number,
    required: true,
  },
  emergencyPhone: {
    type: Number,
    required: true,
  },
  aadharURL: {
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
  },
  patientNotes: {
    type: String,
    required: true,
  },
  clientId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
