const express = require('express');
const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const Request = require('../models/request')

const router = new express.Router();

router.post('/signup', async (req, res)=>{
  try{
    if (req.body.password.length < 8){
      throw new Error("Password not strong");
    }
    if (req.body.phoneNumber.length != 10 || req.body.phoneNumber.match(/[0-9]+/)[0] != req.body.phoneNumber){
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
    let pendingRequest = await Request.findOne({'_id': req.body.requestId})
    const localTime = new Date().getTime()
    const pendingRequestEnquiryStartTime = new Date(pendingRequest.enquiryStartTime).getTime()
    if ((localTime - pendingRequestEnquiryStartTime)/(1000 * 3600) < 24 ) {
      pendingRequest.status = "Confirmed"
      await pendingRequest.save()
      let allPendingRequests = await Request.find({'clientId': pendingRequest.clientId,'patientId': pendingRequest.patientId})
      for(const request of allPendingRequests) {
        if(request.status == "notConfirmed"){
          await request.remove();
        }
      }
      res.send(utils.responseUtil(201, "Session Confirmed", pendingRequest))
    } else {
      throw new Error("Time Limit Expired")
    }
  } catch (err) {
    res.send(utils.responseUtil(400, err.message, null))
  }
})

module.exports = router
