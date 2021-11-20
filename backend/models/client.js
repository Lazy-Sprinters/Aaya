const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
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
    phoneNumber: {
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
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    aadharURL: {
        type: String,
        required: true
    },
    displayPictureURL: {
        type: String,
        required: true
    }
})

const Client = mongoose.model("client",clientSchema)

module.exports = Client