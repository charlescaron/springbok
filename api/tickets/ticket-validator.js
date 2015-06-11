'use strict';

var Statuses = require('./ticket-status');
var Priorities = require('./ticket-priority');

var TITLE_MAX_LENGTH = 150;
var DESC_MAX_LENGTH = 2000;
var ID_LENGTH = 24;

var BAD_ID = "The ticket ID must be a number. Don't play with this.";
var BAD_TITLE = "The ticket title must be an alphanumeric string between 1 and " + TITLE_MAX_LENGTH + " characters";
var BAD_DESC = "The ticket description cannot have more than " + DESC_MAX_LENGTH + " characters";
var BAD_ENV = "You must choose an environment from the predefined list";
var BAD_PROBLEM = "You must choose a problem from the predefined list";
var BAD_CLIENT = "You must choose a client from the predefined list";
var BAD_STATUS = "The ticket status must be one of " + Statuses.getLabels();
var BAD_PRIORITY = "The ticket priority must be one of " + Priorities.getLabels();

module.exports = {
    checkUrlId: function(req, res, next) {
        req.checkParams('id', BAD_ID).isNumeric();
        next();
    },
    checkBodyId: function(req, res, next) {
        req.checkBody('_id', BAD_ID).isNumeric();
        next();
    },

    checkCreationAttributes: function(req, res, next) {
        req.checkBody('title', BAD_TITLE).len(1, TITLE_MAX_LENGTH);
        req.checkBody('description', BAD_DESC).len(0, DESC_MAX_LENGTH);
        req.checkBody('status', BAD_STATUS).isIn(Statuses.getIds());
        req.checkBody('priority', BAD_PRIORITY).isIn(Priorities.getIds());
        req.checkBody('environment', BAD_ENV).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        req.checkBody('problem', BAD_PROBLEM).optional().len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        req.checkBody('client', BAD_CLIENT).optional().len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    }
};

