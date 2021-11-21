const express = require('express');
const utils = require('../lib/util');
const mailer = require('../lib/mailer');
const Client = require('../models/client');
const Admin = require('../models/admin');
const ServiceProvider = require('../models/serviceProvider');
const helper = require('./helper');
const mongoose = require('mongoose');

const router = new express.Router();

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
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalClients: pendingApprovalClients}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/approveClient', async (req, res) =>{
  try{
    const clientId = req.body.clientId;
    const client = await Client.findOne({_id: mongoose.Types.ObjectId(clientId)});
    client.identityVerified = true;
    await client.save();
    // send mail stating that account is ready to use

    mailer.sendEmail(client.email, "Account Verified", "Congratulations, your account is verified and is ready for use.")
    let pendingApprovalClients = await helper.listPendingClientVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalClients: pendingApprovalClients}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/rejectClient', async (req, res) =>{
  try{
    const clientId = req.body.clientId;
    const client = await Client.findOne({_id: mongoose.Types.ObjectId(clientId)});

    //send rejection mail
    mailer.sendEmail(client.email, "Account Verification Status Update", "Greeting, we regret to inform you that your account is marked as unverified by our operation team due to some issue with your documents and you won't be able to use the platform.\nSorry for the inconvenience.\nBut can apply again with more solid of documents.");
    await client.remove();

    let pendingApprovalClients = await helper.listPendingClientVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalClients: pendingApprovalClients}));

  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

router.post('/listPendingApprovalServiceProviders', async (req, res)=>{
  try{
    let pendingApprovalServiceProviders = await helper.listPendingServiceProvidertVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalServiceProviders: pendingApprovalServiceProviders}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/approveServiceProvider', async (req, res) =>{
  try{
    const serviceProviderId = req.body.serviceProviderId;
    const serviceProvider = await ServiceProvider.findOne({_id: mongoose.Types.ObjectId(serviceProviderId)});
    serviceProvider.identityVerified = true;
    await serviceProvider.save();
    // send mail stating that account is ready to use

    mailer.sendEmail(serviceProvider.email, "Account Verified", "Congratulations, your account is verified and is ready for use.")
    let pendingApprovalServiceProviders = await helper.listPendingServiceProvidertVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalServiceProviders: pendingApprovalServiceProviders}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/rejectServiceProvider', async (req, res) =>{
  try{
    const serviceProviderId = req.body.serviceProviderId;
    const serviceProvider = await ServiceProvider.findOne({_id: mongoose.Types.ObjectId(serviceProviderId)});
    
    //send rejection mail
    mailer.sendEmail(serviceProvider.email, "Account Verification Status Update", "Greeting, we regret to inform you that your account is marked as unverified by our operation team due to some issue with your documents and you won't be able to use the platform.\nSorry for the inconvenience.\nBut can apply again with more solid of documents.");
    await serviceProvider.remove();
    
    let pendingApprovalServiceProviders = await helper.listPendingServiceProvidertVerificationRequests();
    res.send(utils.responseUtil(200, "Request Successful", {pendingApprovalServiceProviders: pendingApprovalServiceProviders}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

// router.post('/listCancellationRequests', async (req, res)=>{

// })

module.exports = router
