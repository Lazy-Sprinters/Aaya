const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

const serviceProviderSchema = new mongoose.Schema({
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
    unique: true,
    trim: true
  },
  phoneNumberVerified: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if (!validator.isEmail(value)){
          throw new Error('Email is invalid');
      }
    }
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
    trim: true
  },
  pinCode: {
    type: String,
    required: true,
    trim: true
  },
  policePhone: {
    type: String,
    trim: true,
    required: true,
  },
  emergencyPhone: {
    type: String,
    trim: true,
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
  },
  blocked: {
    type: Boolean,
    default: false
  },
  identityVerified: {
    type: Boolean,
    default: false
  }
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

serviceProviderSchema.statics.findByCredentials = async (userPhone, password) => {
  const user = await ServiceProvider.findOne({phoneNumber: userId, password: password, blocked: false, phoneNumberVerified: true, identityVerified: true});
  if (!user) {
    throw new Error('Login Failed');
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
