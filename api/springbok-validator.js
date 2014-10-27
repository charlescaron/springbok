'use strict';

var BAD_ID = "The event ticket ID must be an alphanumeric string of 24 characters. Don't play with this.";

var ID_LENGTH = 24;

module.exports = {
    checkUrlId: function(req, res, next) {
        req.checkParams('id', BAD_ID).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    },
    checkValidationErrors: function(req, res, next) {

        var errors = req.validationErrors();
        if (errors) {
            res.status(400).json({error: 'Oops, we have a validation error!'});
            return;
        } else {
            next();
        }
    }
};
