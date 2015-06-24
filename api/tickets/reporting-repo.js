'use strict';

var Ticket = require('./ticket-resource');

var aggregateTicketsOn = function(column, req, res) {

    var beginDate = getBeginningOfMonthDate(req.query.year, req.query.month);
    var endDate = getEndOfMonthDate(req.query.year, req.query.month);

    Ticket.aggregate([{
        $match: {
            createdOn: {"$gte": beginDate, "$lte": endDate}
        }
    },
        {
            $group: {
                _id: column,
                count: {$sum: 1}
            }
        }], function(err, response) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
};

var getBeginningOfMonthDate = function(year, month) {

    return new Date(year, month, 1);
};

var getEndOfMonthDate = function(year, month) {

    return new Date(year, parseInt(month) + 1, 1);
};

module.exports = {
    getOpenedByMonth: function(req, res) {

        var beginDate = getBeginningOfMonthDate(req.query.year, req.query.month);
        var endDate = getEndOfMonthDate(req.query.year, req.query.month);

        Ticket.find({
            "createdOn": {
                "$gte": beginDate, "$lte": endDate
            }}).
            sort({lastUpdatedOn: 'desc'}).
            exec(function(err, response) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(response);
                }
            });
    },
    getClientAggregate: function(req, res) {
        aggregateTicketsOn('$client', req, res);
    },
    getEnvironmentAggregate: function(req, res) {
        aggregateTicketsOn('$environment', req, res);
    }
};