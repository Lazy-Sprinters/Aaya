const express = require('express');
const utils = require('../lib/util');
const helper = require('./helper');
const Client = require('../models/client');
const Patient = require('../models/patient');
const Request = require('../models/request');
const mongoose = require('mongoose');
const ServiceProvider = require('../models/serviceProvider');

const router = new express.Router();

router.post('/signup', async (req, res)=>{
  try{
    if (req.body.password.length < 8){
      throw new Error("Password not strong");
    }
    if (req.body.phoneNumber.length != 10 || req.body.phoneNumber.match(/[0-9]+/)[0] != req.body.phoneNumber){
      throw new Error("Invalid Phone Number");
    }
    const client = new Client(req.body);
    await client.save();
    res.send(utils.responseUtil(201, "User Created", null));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/registerPatientRequest', async(req, res)=>{
  try{
    delete req.body.startDate; delete req.body.endDate; delete req.body.startTimeDay; delete req.body.endTimeDay;
    const patient = new Patient(req.body);
    await patient.save();
    const matchingServiceProviders = await ServiceProvider.find({
      serviceType: patient.requirement,
      pincode: patient.pinCode
    });
    let availableServiceProviders = await helper.getAvailableServiceProviders(matchingServiceProviders, req.body.startDate, req.body.endDate,
      req.body.startTimeDay, req.body.endTimeDay);
    const filteredList = helper.filterServiceProvider(availableServiceProviders);
    if (filteredList.length == 0){
      throw new Error("No Service Providers Found");
    }
    res.send(utils.responseUtil(200, "Data Found", {filteredList: filteredList, timeSpecs: [req.body.startDate, req.body.endDate,
      req.body.startTimeDay, req.body.endTimeDay]}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/notifyServiceProvider', async(req, res)=>{
  try{
    const timeSpecs = req.body.timeSpecs; //TODO: Hotfix
    const requestObj = {
      clientId: mongoose.Types.ObjectId(req.body.clientId),
      patientId: mongoose.Types.ObjectId(req.body.patientId),
      serviceProviderId: mongoose.Types.ObjectId(req.body.serviceProviderId),
      startDate: timeSpecs[0],
      endDate: timeSpecs[1],
      startTimeDay: timeSpecs[2],
      endTimeDay: timeSpecs[3],
      calculatedCost: "",
      status: "notConfirmed",
      enquiryStartTime:new Date().toString(),
      FoodProvision:req.body.foodProvision,
      cancelled: false
    }
    const request = new Request(requestObj);
    await request.save();
    //TODO: Send the remaining list of nurses
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

module.exports = router