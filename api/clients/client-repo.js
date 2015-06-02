'use strict';

var Client = require('./client-resource');

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
        Client.find({}, processResponse);
    },
    getById: function(req, res) {
        currentResponse = res;
        Client.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawClient = req.body;
        var converted = new Client({name: rawClient.name, description: rawClient.description});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawClient = req.body;
        var converted = {name: rawClient.name, description: rawClient.description};
        Client.findByIdAndUpdate(rawClient._id, converted, processResponse);
    }
};

