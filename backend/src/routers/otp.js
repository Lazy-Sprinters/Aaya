const express = require('express');
const utils = require('../lib/util');
const otpUtil = require('../lib/otp');

const router = new express.Router();

router.post('/new', async(req, res)=>{
  try{
    const entityType = req.body.entity;
  }catch(err){

  }
})

module.exports = router
