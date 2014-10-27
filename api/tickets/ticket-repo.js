'use strict';

var Ticket = require('./ticket-resource');

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.status(500).json(err);
    } else {
        currentResponse.json(response);
    }
};

module.exports = {
    getAllActive: function(req, res) {
        currentResponse = res;
        Ticket.find({status: 'active'}, processResponse);
    },
    getById: function(req, res) {
        currentResponse = res;
        Ticket.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawTicket = req.body;
        var converted = new Ticket({title: rawTicket.title, status: rawTicket.status, environment: rawTicket.environment});
        converted.save(processResponse);
    }
};


