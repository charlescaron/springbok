"use strict";

var express = require('express');
var router = express.Router();
var ticketValidator = require('./ticket-validator');
var globalValidator = require('../springbok-validator');
var eventValidator = require('./event-validator');
var processor = require('./ticket-repo');
var searchTicketProcessor = require('./search-service');

router.get('/active', processor.getAllActive);

router.get('/closed', processor.getAllClosed);

router.get('/idle', processor.getIdle);

router.get('/onhold', processor.getOnHold);

router.get('/inprogress', processor.getInProgress);

router.get('/statuses', processor.getStatuses);

router.get('/priorities', processor.getPriorities);

router.get('/search', searchTicketProcessor.search);

router.get('/:id', ticketValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/', ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.post('/:id/event', ticketValidator.checkUrlId,
    eventValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.addEvent);

router.put('/:id',  ticketValidator.checkUrlId,
    ticketValidator.checkBodyId,
    ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
