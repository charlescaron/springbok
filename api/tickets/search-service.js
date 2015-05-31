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
    search: function(req, res) {
        currentResponse = res;
        Ticket.find(
            { $text : { $search : req.query.q } },
            { score : { $meta: "textScore" } })
            .limit(10)
            .sort({ score : { $meta : 'textScore' } })
            .exec(processResponse);
    }
};


