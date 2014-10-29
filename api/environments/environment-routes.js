"use strict";

var express = require('express');
var router = express.Router();
var envValidator = require('./environment-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./environment-repo');

router.get('/all', processor.getAll);
router.get('/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/',   envValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.put('/:id',  globalValidator.checkUrlId,
    envValidator.checkBodyId,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
