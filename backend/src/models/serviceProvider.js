const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

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
  },
  token: {
    type: String,
    required: true
  },
  blocked: {
    type: Boolean,
    required: true
  },
});


serviceProviderSchema.methods.generateToken = async function () {
  const serviceProvider = this;
  const payload = {
    _id: serviceProvider._id
  };
  const token =  jwt.sign(payload, process.env.CompanySecret);
  serviceProvider.token = token;
  await serviceProvider.save();
  return token;
}

serviceProviderSchema.statics.findByCredentials = (userPhone, password) => {
  const user = await ServiceProvider.findOne({phoneNumber: userId, password: password, blocked: false, phoneNumberVerified: true});
  if (!user) {
    throw new Error('Unable to login');
  } 
  const isMatch = await bcrypt.compare(user.password, password);
  if(!isMatch) {
    throw new Error('Phone Number/Password is incorrect')
  }
  return user;
}

serviceProviderSchema.pre('save',async function (next) {
  if(this.isModified('password')) {
    const hash = await bcrypt.hash(this.Password, 8);
    this.Password = hash;
  }
  next();
})

const ServiceProvider = mongoose.model(
  "serviceProvider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
