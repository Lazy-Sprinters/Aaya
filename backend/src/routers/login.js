//This file will handle login and forgot password handlers
const express = require('express');
const utils = require('../lib/util');
const client = require('../models/client');
const serviceProvider = require('../models/serviceProvider');

const router = new express.Router();

router.post('/', async (req, res)=>{
  try{
    if (!req.body.role || !req.body.phoneNumber || !req.body.password){
      throw new Error("Role not present");
    }
    const role = req.body.role;
    if (role == "client"){
      const associatedClient = client.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedClient.token = associatedClient.generateToken();
      const clientResponse = utils.removeExtraKeysFromResponse(associatedClient);
      res.send(utils.responseUtil(200, "Login Successful", clientResponse));
    }
    else if (role == "serviceProvider"){
      const associatedServiceProvider = serviceProvider.findByCredentials(req.body.phoneNumber, req.body.password);
      associatedServiceProvider.token = associatedServiceProvider.generateToken();
      const associatedServiceProviderResponse = utils.removeExtraKeysFromResponse(associatedServiceProvider);
      res.send(utils.responseUtil(200, "Login Successful", associatedServiceProviderResponse));
    }
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

module.exports = router