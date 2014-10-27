'use strict';

var TITLE_MAX_LENGTH = 50;
var DESC_MAX_LENGTH = 2000;
var ID_LENGTH = 24;
var TICKET_STATUS = ['ACTIVE','CLOSED'];

var BAD_TITLE = "The ticket title must be an alphanumeric string between 1 and " + TITLE_MAX_LENGTH + " characters";
var BAD_DESC = "The ticket description cannot have more than " + DESC_MAX_LENGTH + " characters";
var BAD_STATUS = "The ticket status must be one of " + TICKET_STATUS;

module.exports = {
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('title', BAD_TITLE).len(1, TITLE_MAX_LENGTH).isAlphanumeric();
        req.checkBody('description', BAD_DESC).len(0, DESC_MAX_LENGTH);
        //req.checkBody('status', BAD_DESC).isIn(TICKET_STATUS);
        req.checkBody('environment', BAD_DESC).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    }
};

