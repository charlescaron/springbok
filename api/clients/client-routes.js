"use strict";

var express = require('express');
var router = express.Router();
var clientValidator = require('./client-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./client-repo');

router.get('/all', processor.getAll);
router.get('/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/',   clientValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.put('/:id',  globalValidator.checkUrlId,
    globalValidator.checkBodyId,
    clientValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
