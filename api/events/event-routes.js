"use strict";

var express = require('express');
var router = express.Router();
var eventValidator = require('./event-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./event-repo');

router.post('/events/', eventValidator.checkCreationAttributes,
                        globalValidator.checkValidationErrors,
                        processor.create);

router.get('/events/ticket/:id', globalValidator.checkUrlId,
                                    globalValidator.checkValidationErrors,
                                    processor.getByTicketId);

module.exports = router;
