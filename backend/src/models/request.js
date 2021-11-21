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
  serviceProviderId: {
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
    enum: ["notConfirmed", "Confirmed", "Completed"],
    default: "notConfirmed"
  },
  enquiryStartTime:{
    type: String,
    required: true
  },
  foodProvision:{
    type: Boolean,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  cancellationReason: {
    type: String,
    default: ""
  }
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
