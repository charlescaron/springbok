"use strict";

var express = require('express');
var router = express.Router();
var ticketValidator = require('./ticket-validator');
var globalValidator = require('../springbok-validator');
var eventValidator = require('./event-validator');
var processor = require('./ticket-repo');

router.get('/active', processor.getAllActive);

router.get('/idle', processor.getIdle);

router.get('/onhold', processor.getOnHold);

router.get('/inprogress', processor.getInProgress);

router.get('/statuses', processor.getStatuses);

router.get('/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/', ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.post('/:id/event', globalValidator.checkUrlId,
    eventValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.addEvent);

router.put('/:id',  globalValidator.checkUrlId,
    globalValidator.checkBodyId,
    ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
