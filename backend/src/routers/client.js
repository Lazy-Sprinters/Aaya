const express = require('express');
const utils = require('../lib/util');
const helper = require('./helper');
const Client = require('../models/client');
const Patient = require('../models/patient');
const Request = require('../models/request');
const mongoose = require('mongoose');
const ServiceProvider = require('../models/serviceProvider');
const mailer = require('../lib/mailer');

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

router.post('/registerPatient', async(req, res)=>{
  try{
    const startDate = req.body.startDate; 
    const endDate = req.body.endDate;
    const startTimeDay = req.body.startTimeDay; 
    const endTimeDay = req.body.endTimeDay;
    
    delete req.body.startDate; 
    delete req.body.endDate;
    delete req.body.startTimeDay; 
    delete req.body.endTimeDay;
    
    const patient = new Patient(req.body);
    await patient.save();
    
    const matchingServiceProviders = await ServiceProvider.find({
      serviceType: patient.requirement,
      pinCode: patient.pinCode,
      identityVerified: true,
      blocked: false
    });
    let availableServiceProviders = await helper.getAvailableServiceProviders(matchingServiceProviders, patient._id, startDate, endDate, startTimeDay, endTimeDay);
    
    const filteredList = helper.filterServiceProvider(availableServiceProviders);
    if (filteredList.length == 0){
      throw new Error("No Service Providers Found");
    }
    
    res.send(utils.responseUtil(200, "Data Found", {filteredList: filteredList, timeSpecs: [startDate, endDate, startTimeDay, endTimeDay]}));
  }catch(err){
    console.log(err);
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/notifyServiceProvider', async(req, res)=>{
  try{
    const timeSpecs = req.body.timeSpecs; //TODO: Hotfix
    const daysWorked = (helper.parseDate(timeSpecs[1]) - helper.parseDate(timeSpecs[0]))/(1000 * 60 * 60 * 24);
    const associatedServiceProvider = await ServiceProvider.findOne({"_id":mongoose.Types.ObjectId(req.body.serviceProviderId)})
    const cost = daysWorked * associatedServiceProvider.dailyFees
    const requestObj = {
      clientId: mongoose.Types.ObjectId(req.body.clientId),
      patientId: mongoose.Types.ObjectId(req.body.patientId),
      serviceProviderId: mongoose.Types.ObjectId(req.body.serviceProviderId),
      startDate: timeSpecs[0],
      endDate: timeSpecs[1],
      startTimeDay: timeSpecs[2],
      endTimeDay: timeSpecs[3],
      calculatedCost: cost,
      status: "notConfirmed",
      enquiryStartTime:new Date().toString(),
      foodProvision:req.body.foodProvision,
      cancelled: false
    }

    const request = new Request(requestObj);
    await request.save();

    mailer.sendEmail(associatedServiceProvider.email, "A new Request has arrived", "Please check the portal, you have received a request for service.");
    
    const patient = await Patient.findOne({_id: mongoose.Types.ObjectId(req.body.patientId)});

    const matchingServiceProviders = await ServiceProvider.find({
      serviceType: patient.requirement,
      pinCode: patient.pinCode,
      identityVerified: true,
      blocked: false
    });

    let availableServiceProviders = await helper.getAvailableServiceProviders(matchingServiceProviders, req.body.patientId, timeSpecs[0], timeSpecs[1], timeSpecs[2], timeSpecs[3]);
    const filteredList = helper.filterServiceProvider(availableServiceProviders);
    
    res.send(utils.responseUtil(200, "Data Found", {filteredList: filteredList, timeSpecs: timeSpecs}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

module.exports = router