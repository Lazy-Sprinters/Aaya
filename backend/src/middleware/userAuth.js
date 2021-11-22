const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Client = require("../models/client");
const ServiceProvider = require("../models/client");
const util = require('../lib/util');
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const auth = async (req, res, next) => {
  try {
    if (!req.body.token || !req.body.role){
      throw new Error("token/role not present");
    }
    const token = req.body.token;
    const role = req.body.role;
    const decoded = jwt.verify(token, process.env.CompanySecret);
    if (role == 'client'){
      const client = await Client.findOne({
        _id: decoded._id,
        token: token
      });
      if (!client){
        throw new Error("Auth error");
      }
      req.client = client;
    }
    else if (role == 'serviceProvider'){
      const serviceProvider = await ServiceProvider.findOne({
        _id: decoded._id,
        token: token
      });
      if (!serviceProvider){
        throw new Error("Auth error");
      }
      req.serviceProvider = serviceProvider;
    }
    if (role == 'admin'){
      const admin = await Admin.findOne({
        _id: decoded._id,
        token: token
      });
      if (!admin){
        throw new Error("Auth error");
      }
      req.admin = admin;
    }
    req.token = token;
    next();
  } catch (err) {
    res.send(utils.responseUtil(401, err.message, null));
  }
};

module.exports = auth;
