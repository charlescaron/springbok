"use strict";

var express = require('express');
var router = express.Router();
var Ticket = require('./ticket-resource');

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.json(err);
    } else {
        currentResponse.json(response);
    }
};

router.get('/tickets/active', function(req, res) {

    currentResponse = res;
    Ticket.find({status: 'active'}, processResponse);
});

router.get('/tickets/:id', function(req, res) {

    currentResponse = res;
    Ticket.findById(req.params.id, processResponse);
});

router.post('/tickets/', function(req, res) {

    currentResponse = res;
    var rawTicket = req.body;
    var converted = new Ticket({title: rawTicket.title, status: rawTicket.status, environment: rawTicket.environment});
    converted.save(processResponse);
});

module.exports = router;
