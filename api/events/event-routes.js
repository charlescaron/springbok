"use strict";

var express = require('express');
var router = express.Router();
var eventValidator = require('./event-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./event-repo');

router.post('/', eventValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.get('/ticket/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getByTicketId);

module.exports = router;
