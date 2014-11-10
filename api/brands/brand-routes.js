"use strict";

var express = require('express');
var router = express.Router();
var brandValidator = require('./brand-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./brand-repo');

router.get('/all', processor.getAll);
router.get('/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/',   brandValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.put('/:id',  globalValidator.checkUrlId,
    globalValidator.checkBodyId,
    brandValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
