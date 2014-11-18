'use strict';

var Ticket = require('./ticket-resource');
var Statuses = require('./ticket-status');
var Priorities = require('./ticket-priority');

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
    getIdle: function(req, res) {
        currentResponse = res;
        Ticket.find({status: 'open'}, processResponse);
    },
    getOnHold: function(req, res) {
        currentResponse = res;
        Ticket.find({$or : [{status: 'blocked_third_party'}, {status: 'bugfix'}]}, processResponse);
    },
    getInProgress: function(req, res) {
        currentResponse = res;
        Ticket.find({status: 'in_progress'}, processResponse);
    },
    getStatuses: function(req, res) {
        res.json(Statuses.getAll());
    },
    getPriorities: function(req, res) {
        res.json(Priorities.getAll());
    },
    getById: function(req, res) {
        currentResponse = res;
        Ticket.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawTicket = req.body;
        var converted = new Ticket({title: rawTicket.title, status: rawTicket.status, priority: rawTicket.priority,
            description: rawTicket.description, environment: rawTicket.environment, problem: rawTicket.problem,
            brand: rawTicket.brand, events: [{date: new Date(), text: 'Ticket created'}]});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawTicket = req.body;
        var converted = {title: rawTicket.title, status: rawTicket.status, description: rawTicket.description,
            environment: rawTicket.environment, priority: rawTicket.priority};
        if (rawTicket.problem) {
            converted.problem = rawTicket.problem;
        }
        if (rawTicket.brand) {
            converted.brand = rawTicket.brand;
        }
        Ticket.findByIdAndUpdate(rawTicket._id, converted, processResponse);
    },
    addEvent: function(req, res) {
        currentResponse = res;
        Ticket.findById(req.params.id, function(err, response) {
            if (err) {
                res.status(500).json(err);
            } else {
                response.events.push({date: new Date(), text: req.body.text});
                response.save(processResponse);
            }
        });
    }

};


