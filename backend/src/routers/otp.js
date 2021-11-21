const express = require('express');
const Otp = require('../models/otp');
const utils = require('../lib/util');
const otpUtil = require('../lib/otp');
const mailerUtils = require('../lib/mailer');

const router = new express.Router();

router.post('/new', async(req, res)=>{
  try{
    const entityType = req.body.type;
    if (entityType == 'email'){
      const email = req.body.entity;
      const otpToSend = utils.getOtp();
      const mailBody = `Thanks for your time and interest in our website, Otp for verification of your email ${email} is ${otpToSend}`;
      await mailerUtils.sendEmail(email, 'Please Verify you Email', mailBody);
      const otp = new Otp({entity: email, otp: otpToSend});
      await otp.save();
      res.send(utils.responseUtil(200, "Otp sent successfully", null));
    }
    else if (entityType == 'phoneNumber'){
      const phoneNumber = req.body.entity;
      const otpToSend = utils.getOtp();
      const messageBody = `Thanks for your time and interest in our website, Otp for verification of your phone number ${phoneNumber} is ${otpToSend}`;
      await otpUtil.sendOtp("Aaya", phoneNumber, messageBody);
      // console.log("here")
      const otp = new Otp({entity: phoneNumber, otp: otpToSend});
      await otp.save();
      res.send(utils.responseUtil(200, "Otp sent successfully", null));
    }
  }catch(err){

  }
})

module.exports = router
