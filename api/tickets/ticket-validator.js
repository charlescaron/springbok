'use strict';

var Statuses = require('./ticket-status');

var TITLE_MAX_LENGTH = 150;
var DESC_MAX_LENGTH = 2000;
var ID_LENGTH = 24;

var BAD_TITLE = "The ticket title must be an alphanumeric string between 1 and " + TITLE_MAX_LENGTH + " characters";
var BAD_DESC = "The ticket description cannot have more than " + DESC_MAX_LENGTH + " characters";
var BAD_ENV = "You must choose an environment from the predefined list";
var BAD_PROBLEM = "You must choose a problem from the predefined list";
var BAD_BRAND = "You must choose a brand from the predefined list";
var BAD_STATUS = "The ticket status must be one of " + Statuses.getLabels();

module.exports = {
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('title', BAD_TITLE).len(1, TITLE_MAX_LENGTH);
        req.checkBody('description', BAD_DESC).len(0, DESC_MAX_LENGTH);
        req.checkBody('status', BAD_STATUS).isIn(Statuses.getIds());
        req.checkBody('environment', BAD_ENV).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        req.checkBody('problem', BAD_PROBLEM).optional().len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        req.checkBody('brand', BAD_BRAND).optional().len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    }
};

