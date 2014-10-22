"use strict";

var express = require('express');
var router = express.Router();

var Event = require('./event-resource');

router.post('/events/', function(req, res) {

    currentResponse = res;
    var rawEvent = req.body;
    var converted = new Event({date: rawEvent.date, text: rawEvent.text, ticket: rawEvent.ticket});
    converted.save(processResponse);
});

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.json(err);
    } else {
        currentResponse.json(response);
    }
};

router.get('/events/ticket/:id', function(req, res) {

    currentResponse = res;
    Event.find({ticket: req.params.id}, processResponse);
});

module.exports = router;
