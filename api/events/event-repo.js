'use strict';

var Event = require('./event-resource');

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.status(500).json(err);
    } else {
        currentResponse.json(response);
    }
};

module.exports = {
    getByTicketId: function(req, res) {
        currentResponse = res;
        Event.find({ticket: req.params.id}).sort({date: 'desc'}).exec(processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawEvent = req.body;
        var converted = new Event({date: new Date(), text: rawEvent.text, ticket: rawEvent.ticket});
        converted.save(processResponse);
    }
};


