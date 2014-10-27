'use strict';

var TEXT_MAX_LENGTH = 1000;

var BAD_ID = "The event ticket ID must be an alphanumeric string of 24 characters. Don't play with this.";
var BAD_DATE = "The event name must be an alphanumeric string between 1 and 50 characters";
var BAD_DESC = "The environment description cannot have more than " + TEXT_MAX_LENGTH + " characters";

module.exports = {
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('date', BAD_DATE).isAfter();
        req.checkBody('text', BAD_DESC).len(1, TEXT_MAX_LENGTH);
        req.checkParams('ticket', BAD_ID).isMongoId();
        next();
    }
};

