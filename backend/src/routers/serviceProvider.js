const express = require('express');
const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const Request = require('../models/request')
const mongoose = require('mongoose');
const mailer = require('../lib/mailer');

const router = new express.Router();

router.post('/signup', async (req, res)=>{
  try{
    if (!req.body.password || req.body.password.length < 8){
      throw new Error("Password not strong");
    }
    if (!req.body.phoneNumber || req.body.phoneNumber.length != 10 || req.body.phoneNumber.match(/[0-9]+/)[0] != req.body.phoneNumber){
      throw new Error("Invalid Phone Number");
    }
    const serviceProvider = new ServiceProvider(req.body);
    await serviceProvider.save();
    res.send(utils.responseUtil(201, "User Created", null));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/confirmRequest', async (req, res) => {
  try {
    let pendingRequest = await Request.findOne({'_id': mongoose.Types.ObjectId(req.body.requestId)})
    const localTime = new Date().getTime()
    const pendingRequestEnquiryStartTime = new Date(pendingRequest.enquiryStartTime).getTime()

    if ((localTime - pendingRequestEnquiryStartTime)/(1000 * 3600) < 24 ) {
      pendingRequest.status = "Confirmed"
      await pendingRequest.save()
    
      // removing all the other request sent for the same patient to all other service providers
      let allPendingRequestsForSamePatient = await Request.find({'clientId':  mongoose.Types.ObjectId(pendingRequest.clientId),
      'patientId':  mongoose.Types.ObjectId(pendingRequest.patientId)})
      for(const request of allPendingRequestsForSamePatient) {
        if(request.status == "notConfirmed"){
          await request.remove();
        }
      }

      const allPendingRequestsForServiceProvider = await Request.find({status: "notConfirmed",
        serviceProviderId: mongoose.Types.ObjectId(pendingRequest.serviceProviderId)});
      res.send(utils.responseUtil(201, "Session Confirmed", {pendingRequests: allPendingRequestsForServiceProvider}))
    } else {
      throw new Error("Time Limit Expired")
    }
  } catch (err) {
    res.send(utils.responseUtil(400, err.message, null))
  }
});

router.post('/rejectRequest', async (req, res) => {
  try{
    const request = await Request.findOne({'_id': mongoose.Types.ObjectId(req.body.requestId)});
    const client = await Client.findOne({'_id': request.clientId});
    const serviceProvider = await ServiceProvider.findOne({'_id': request.serviceProviderId});

    mailer.sendEmail(client.email, "Request rejected by Service Provider", "This is to inform you that your request has been rejected by one of the service providers");

    await request.remove();
    const allPendingRequestsForServiceProvider = await Request.find({status: "notConfirmed",
      serviceProviderId: mongoose.Types.ObjectId(serviceProvider._id)});
    res.send(utils.responseUtil(200, "Session Confirmed", {pendingRequests: allPendingRequestsForServiceProvider}))

  }catch(err){
    res.send(utils.responseUtil(400, err.message, null))
  }
});

router.post('/getAllRequests', async (req, res) => {
  try{
    const serviceProviderId = req.body.serviceProviderId;
    const allPendingRequestsForServiceProvider = await Request.find({status: "notConfirmed", serviceProviderId: serviceProviderId});
    res.send(utils.responseUtil(200, "Request success", {pendingRequests: allPendingRequestsForServiceProvider}))
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null))
  }
});



module.exports = router
