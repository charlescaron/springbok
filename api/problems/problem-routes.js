"use strict";

var express = require('express');
var router = express.Router();
var problemValidator = require('./problem-validator');
var globalValidator = require('../springbok-validator');
var processor = require('./problem-repo');

router.get('/all', processor.getAll);
router.get('/:id', globalValidator.checkUrlId,
    globalValidator.checkValidationErrors,
    processor.getById);

router.post('/',   problemValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.create);

router.put('/:id',  globalValidator.checkUrlId,
    globalValidator.checkBodyId,
    problemValidator.checkCreationAttributes,
    globalValidator.checkValidationErrors,
    processor.update);

module.exports = router;
