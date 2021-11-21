const express = require('express');
const utils = require('../lib/util');
const Client = require('../models/client');
const Admin = require('../models/admin');
const ServiceProvider = require('../models/serviceProvider');
const helper = require('./helper');

const router = new express.Router();

router.post('/login', async(req, res)=>{
  try{
    const admin = await Admin.findByCredentials(req.body.email, req.body.password);
    let adminResponse = admin;
    adminResponse.token = await admin.generateToken();
    delete adminResponse.password;
    res.send(utils.responseUtil(201, "Login Successful", adminResponse));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

router.post('/create', async(req, res)=>{
  try{
    const admin = new Admin(req.body);
    await admin.save();
    res.send(utils.responseUtil(201, "Admin Created", null));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

router.post('/listPendingApprovalClients', async (req, res)=>{
  try{
    let pendingApprovalClients = await helper.listPendingClientVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", pendingApprovalClients));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/approveClient', async (req, res) =>{
  try{
    const clientId = req.body.clientId;
    const client = await Client.findOne({_id: clientId});
    client.identityVerified = true;
    await client.save();
    let remainingApprovalClients = await helper.listPendingClientVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", remainingApprovalClients));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

router.post('/listPendingApprovalServiceProviders', async (req, res)=>{
  try{
    let pendingApprovalServiceProviders = await helper.listPendingServiceProvidertVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", pendingApprovalServiceProviders));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/approveServiceProvider', async (req, res) =>{
  try{
    const serviceProviderId = req.body.serviceProviderId;
    const serviceProvider = await ServiceProvider.findOne({_id: serviceProviderId});
    serviceProvider.identityVerified = true;
    await serviceProvider.save();
    let remainingPendingApprovalServiceProviders = await helper.listPendingServiceProvidertVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", remainingPendingApprovalServiceProviders));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

// router.post('/listCancellationRequests', async (req, res)=>{

// })

module.exports = router
