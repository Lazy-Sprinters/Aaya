const express = require('express');
const Otp = require('../models/otp');
const utils = require('../lib/util');
const otpUtil = require('../lib/otp');
const mailerUtils = require('../lib/mailer');

const router = new express.Router();

router.post('/new', async(req, res)=>{
  try{
    const entityType = req.body.type;
    const otpToSend = utils.getOtp();
    if (entityType == 'email'){
      const email = req.body.entity;
      const mailBody = `Thanks for your time and interest in our website, Otp for verification of your email ${email} is ${otpToSend}`;
      mailerUtils.sendEmail(email, 'Please Verify you Email', mailBody);
      await Otp.findCreateOrUpdate(email, otpToSend);
      res.send(utils.responseUtil(200, "Otp sent successfully", null));
    }
    else if (entityType == 'phoneNumber'){
      const phoneNumber = req.body.entity;
      const messageBody = `Thanks for your time and interest in our website, Otp for verification of your phone number ${phoneNumber} is ${otpToSend}`;
      // await otpUtil.sendOtp("Aaya", phoneNumber, messageBody);
      await Otp.findCreateOrUpdate(phoneNumber, "123456");
      res.send(utils.responseUtil(200, "Otp sent successfully", null));
    }
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
});

router.post('/verify', async (req, res)=>{
  try{
    const associatedOtp = await Otp.findOne({entity: req.body.entity});
    if (associatedOtp.otp == req.body.otp){
      await Otp.findOneAndDelete({entity: req.body.entity})
      res.send(utils.responseUtil(200, "Otp verified successfully", null));
    }
    else{
      throw new Error("Wrong otp");
    }
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

module.exports = router
