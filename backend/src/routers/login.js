//This file will handle login and forgot password handlers
const express = require('express');
const utils = require('../lib/util');
const client = require('../models/client');
const serviceProvider = require('../models/serviceProvider');
const Admin = require('../models/admin');
const Request = require('../models/request')
const helper = require('./helper');

const router = new express.Router();

router.post('/', async (req, res)=>{
  try{
    if (!req.body.role || !req.body.phoneNumber || !req.body.password){
      throw new Error("Role not present");
    }
    const role = req.body.role;
    if (role == "client"){
      let associatedClient = client.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedClient.token = associatedClient.generateToken();
      const clientResponse = utils.removeExtraKeysFromResponse(associatedClient);
      res.send(utils.responseUtil(200, "Login Successful", clientResponse._id));
    }
    else if (role == "serviceProvider"){
      let associatedServiceProvider = serviceProvider.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedServiceProvider.token = associatedServiceProvider.generateToken();
      const associatedServiceProviderResponse = utils.removeExtraKeysFromResponse(associatedServiceProvider);
      const pendingRequests = await Request.find({ServiceProviderId: associatedServiceProviderResponse.ServiceProviderId, status: "notConfirmed"})
      res.send(utils.responseUtil(200, "Login Successful", pendingRequests));
    }
    else if (role == "admin"){
      let adminResponse =Admin.findByCredentials(req.body.email, req.body.password);
      adminResponse.token = admin.generateToken();
      delete adminResponse.password;
      const openClientVerificationRequests = await helper.listPendingClientVerificationRequests()
      res.send(utils.responseUtil(201, "Login Successful", openClientVerificationRequests));
    }
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

module.exports = router