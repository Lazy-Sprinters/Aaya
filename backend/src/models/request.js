const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ServiceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTimeDay: {
    type: String,
    required: true,
  },
  endTimeDay: {
    type: String,
    required: true,
  },
  calculatedCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["notConfirmed", "Confirmed"],
    default: "notConfirmed"
  },
  enquiryStartTime:{
    type: String,
    required: true
  },
  FoodProvision:{
    type: Boolean,
    required: true
  }
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
