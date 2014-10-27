"use strict";

var express = require('express');
var router = express.Router();
var ticketValidator = require('./ticket-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./ticket-repo');

router.get('/tickets/active', processor.getAllActive);

router.get('/tickets/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/tickets/', ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

module.exports = router;
