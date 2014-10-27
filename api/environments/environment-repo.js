'use strict';

var Environment = require('./environment-resource');

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.status(500).json(err);
    } else {
        currentResponse.json(response);
    }
};

module.exports = {
    getAll: function(req, res) {
        currentResponse = res;
        Environment.find({}, processResponse);
    },
    getById: function(req, res) {
        currentResponse = res;
        Environment.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawEnvironment = req.body;
        var converted = new Environment({name: rawEnvironment.name, description: rawEnvironment.description});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawEnvironment = req.body;
        var converted = new Environment({_id:req.params.id, name: rawEnvironment.name, description: rawEnvironment.description});
        converted.save(processResponse);
    }
};

