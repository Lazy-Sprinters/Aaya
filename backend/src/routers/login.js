//This file will handle login and forgot password handlers
const express = require('express');
const utils = require('../lib/util');
const client = require('../models/client');
const serviceProvider = require('../models/serviceProvider');
const Admin = require('../models/admin');
const Request = require('../models/request')
const helper = require('./helper');
const mongoose = require('mongoose');

const router = new express.Router();

router.post('/in', async (req, res)=>{
  try{
    if (!req.body.role || !req.body.phoneNumber || !req.body.password){
      throw new Error("Data not present");
    }
    const role = req.body.role;
    if (role == "client"){
      let associatedClient = await client.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedClient.token = associatedClient.generateToken();
      
      const clientResponse = utils.removeExtraKeysFromResponse(associatedClient); //TODO: can be removed
      res.send(utils.responseUtil(200, "Login Successful", {clientId: clientResponse._id}));
    }
    else if (role == "serviceProvider"){
      let associatedServiceProvider = await serviceProvider.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedServiceProvider.token = associatedServiceProvider.generateToken();
      
      const associatedServiceProviderResponse = utils.removeExtraKeysFromResponse(associatedServiceProvider);
      const pendingRequests = await Request.find({serviceProviderId: mongoose.Types.ObjectId(associatedServiceProviderResponse._id),
        status: "notConfirmed"})
      res.send(utils.responseUtil(200, "Login Successful", {pendingRequests: pendingRequests,
        serviceProviderId: associatedServiceProviderResponse._id}));
    }
    else if (role == "admin"){
      let adminResponse =await Admin.findByCredentials(req.body.phoneNumber, req.body.password);
      adminResponse.token = adminResponse.generateToken();
      delete adminResponse.password;
      
      const openClientVerificationRequests = await helper.listPendingClientVerificationRequests()
      res.send(utils.responseUtil(201, "Login Successful", {pendingApprovalClients: openClientVerificationRequests}));
    }
  }catch(err){
    console.log(err);
    res.send(utils.responseUtil(400, err.message, null));
  }
});


router.post('/out', async (req, res) => {
  try {
    const role = req.body.role
    if(role == 'client') {
      let associatedClient = await client.findOne({'_id': mongoose.Types.ObjectId(req.body.clientId)})
      associatedClient.token = ""
      res.send(utils.responseUtil(200, "Client Logged out", null))
    } else if (role == 'serviceProvider') {
      let associatedServiceProvider = await serviceProvider.findOne({'_id': mongoose.Types.ObjectId(req.body.serviceProviderId)})
      associatedServiceProvider.token = ""
      res.send(utils.responseUtil(200, "Service Provider Logged out", null))
    } else if (role == 'admin') {
      let associatedAdmin = await Admin.findOne({'_id': mongoose.Types.ObjectId(req.body.adminId)})
      associatedAdmin.token = ""
      res.send(utils.responseUtil(200, "Admin Logged out", null))
    }
  } catch (err) {
    res.send(util.responseUtil(400, err.message, null))
  }
})


module.exports = router