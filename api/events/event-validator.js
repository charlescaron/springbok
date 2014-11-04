'use strict';

var TEXT_MAX_LENGTH = 1000;
var ID_LENGTH = 24;

var BAD_ID = "The event ticket ID must be an alphanumeric string of 24 characters. Don't play with this.";
var BAD_DESC = "The environment description cannot have more than " + TEXT_MAX_LENGTH + " characters";

module.exports = {
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('text', BAD_DESC).len(1, TEXT_MAX_LENGTH);
        req.checkBody('ticket', BAD_ID).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    }
};

