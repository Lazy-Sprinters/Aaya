const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const clientSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
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
  aadhaarURL: {
    type: String,
    required: true,
  },
  displayPictureURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  blocked: {
    type: Boolean,
    default: false
  }
});

clientSchema.methods.generateToken = async function(){
  const client = this;
  const payload = {
    _id: client._id
  };
  const token = jwt.sign(payload, process.env.CompanySecret);
  client.token = token;
  await client.save();
  return token;

}

clientSchema.statics.findByCredentials = (userPhone, password) =>{
  const user = await Client.findOne({phoneNumber: userPhone, password: password, blocked: false, phoneNumberVerified: true});
  if (user){
    throw new Error("User not found");
  }
  const passwordMatched = await bcrypt.compare(user.password, password);
  if (!passwordMatched){
    throw new Error("Either Phone Number or Password is incorrect");
  }
  return user;
}

clientSchema.pre('save',async function(next){
  if (this.isModified('password')){
        const hash=await bcrypt.hash(this.password,8);
        this.password=hash;
  }
  next();
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
