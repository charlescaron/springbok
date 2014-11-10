'use strict';

var Problem = require('./problem-resource');

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
        Problem.find({}, processResponse);
    },
    getById: function(req, res) {
        currentResponse = res;
        Problem.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawProblem = req.body;
        var converted = new Problem({name: rawProblem.name, description: rawProblem.description});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawProblem = req.body;
        var converted = {name: rawProblem.name, description: rawProblem.description};
        Problem.findByIdAndUpdate(rawProblem._id, converted, processResponse);
    }
};

