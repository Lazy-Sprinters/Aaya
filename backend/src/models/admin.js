const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const adminSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  }
});

adminSchema.methods.generateToken = async function () {
  let admin = this;
  const payload = {
    _id: admin._id,
  };
  const token = jwt.sign(payload, process.env.CompanySecret);
  admin.token = token;
  await admin.save();
  return token;
};

adminSchema.statics.findByCredentials = async (phoneNumber, password) => {
  const admin = await Admin.findOne({
    phoneNumber: phoneNumber,
  });
  if (!admin) {
    throw new Error("User not found");
  }
  const passwordMatched = await bcrypt.compare(password, admin.password);
  if (!passwordMatched) {
    throw new Error("Either Email or Password is incorrect");
  }
  return admin;
};

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
