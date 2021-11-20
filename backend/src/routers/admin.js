const express = require('express');
const utils = require('../lib/util');
const client = require('../models/client');
const serviceProvider = require('../models/serviceProvider');

const router = new express.Router();

module.exports = router
