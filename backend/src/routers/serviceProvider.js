const express = require('express');
const utils = require('../lib/util');
const Client = require('../models/client');
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
    const serviceProvider = new ServiceProvider(req.body);
    await serviceProvider.save();
    res.send(utils.responseUtil(201, "User Created", null));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

module.exports = router
