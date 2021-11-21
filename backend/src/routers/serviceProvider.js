const express = require('express');
const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const Request = require('../models/request')
const mongoose = require('mongoose');

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

router.post('/confirm', async (req, res) => {
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
})

module.exports = router
