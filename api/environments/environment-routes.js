"use strict";

var express = require('express');
var router = express.Router();

var Environment = require('./environment-resource');

router.get('/environments/all', function(req, res) {

    currentResponse = res;
    Environment.find({}, processResponse);
});

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.json(err);
    } else {
        currentResponse.json(response);
    }
};

router.get('/environments/:id', function(req, res) {

    currentResponse = res;
    Environment.findById(req.params.id, processResponse);
});

router.post('/environments/', function(req, res) {

    currentResponse = res;
    var rawEnvironment = req.body;
    var converted = new Environment({name: rawEnvironment.name, description: rawEnvironment.description});
    converted.save(processResponse);
});

router.put('/environments:id', function(req, res) {

    currentResponse = res;
    var rawEnvironment = req.body;
    var converted = new Environment({_id:req.params.id, name: rawEnvironment.name, description: rawEnvironment.description});
    converted.save(processResponse);
});

module.exports = router;
