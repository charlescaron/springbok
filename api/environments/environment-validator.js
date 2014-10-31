'use strict';

var NAME_MAX_LENGTH = 50;
var DESC_MAX_LENGTH = 200;
var ID_LENGTH = 24;

var BAD_ID = "The environment ID must be an alphanumeric string of 24 characters. Don't play with this.";
var BAD_NAME = "The environment name must be an alphanumeric string between 1 and " + NAME_MAX_LENGTH + " characters";
var BAD_DESC = "The environment description cannot have more than " + DESC_MAX_LENGTH + " characters";

module.exports = {
    checkBodyId: function(req, res, next) {
        req.checkBody('_id', BAD_ID).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    },
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('name', BAD_NAME).len(1, NAME_MAX_LENGTH).isAlphanumeric();
        req.checkBody('description', BAD_DESC).optional().len(0, DESC_MAX_LENGTH);
        next();
    }
};
