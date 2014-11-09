'use strict';

var Ticket = require('./ticket-resource');
var Statuses = require('./ticket-status');

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
        Ticket.find({status: {'$ne':'closed'}}, processResponse);
    },
    getStatuses: function(req, res) {
        res.json(Statuses.getAll());
    },
    getById: function(req, res) {
        currentResponse = res;
        Ticket.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawTicket = req.body;
        var converted = new Ticket({title: rawTicket.title, status: rawTicket.status, description: rawTicket.description,
            environment: rawTicket.environment});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawTicket = req.body;
        var converted = {title: rawTicket.title, status: rawTicket.status, description: rawTicket.description,
            environment: rawTicket.environment};
        Ticket.findByIdAndUpdate(rawTicket._id, converted, processResponse);
    }
};


