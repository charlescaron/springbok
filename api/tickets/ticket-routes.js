"use strict";

var express = require('express');
var router = express.Router();
var ticketValidator = require('./ticket-validator');
var globalValidator = require('../springbok-validator');
var eventValidator = require('./event-validator');
var ticketProcessor = require('./ticket-repo');
var ticketReportingProcessor = require('./reporting-repo');
var ticketSearchProcessor = require('./search-service');

router.get('/active', ticketProcessor.getAllActive);

router.get('/closed', ticketProcessor.getAllClosed);

router.get('/idle', ticketProcessor.getIdle);

router.get('/onhold', ticketProcessor.getOnHold);

router.get('/inprogress', ticketProcessor.getInProgress);

router.get('/statuses', ticketProcessor.getStatuses);

router.get('/priorities', ticketProcessor.getPriorities);

router.get('/search', ticketSearchProcessor.search);

router.get('/openedbymonth', ticketReportingProcessor.getOpenedByMonth);

router.get('/clientaggregate', ticketReportingProcessor.getClientAggregate);

router.get('/environmentaggregate', ticketReportingProcessor.getEnvironmentAggregate);

router.get('/:id', ticketValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    ticketProcessor.getById);

router.post('/', ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    ticketProcessor.create);

router.post('/:id/event', ticketValidator.checkUrlId,
    eventValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    ticketProcessor.addEvent);

router.put('/:id',  ticketValidator.checkUrlId,
    ticketValidator.checkBodyId,
    ticketValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    ticketProcessor.update);

module.exports = router;
