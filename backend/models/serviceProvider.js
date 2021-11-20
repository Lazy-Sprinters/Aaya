const mongoose = require('mongoose')

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    policePhone: {
        type: Number,
        required: true
    },
    emergencyPhone: {
        type: Number,
        required: true
    },
    serviceType: {
        type: [String],
        required: true
    },
    aadharURL: {
        type: String,
        required: true
    },
    certificateURL: {
        type: String
    },
    displayPictureURL: {
        type: String,
        required: true
    }
})

const ServiceProvider = mongoose.model("serviceProvider",serviceProviderSchema)

module.exports = ServiceProvider