const express = require('express');
const utils = require('../lib/util');
const helper = require('./helper');
const Client = require('../models/client');
const Patient = require('../models/patient');
const Request = require('../models/request');
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
      pincode: patient.pinCode
    });
    let availableServiceProviders = await helper.getAvailableServiceProviders();
    const filteredList = helper.filterServiceProvider(availableServiceProviders);
    if (filteredList.length == 0){
      throw new Error("No Service Providers Found");
    }
    res.send(utils.responseUtil(200, "Data Found", filteredList));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

module.exports = router