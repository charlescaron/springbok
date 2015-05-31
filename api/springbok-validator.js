'use strict';

var BAD_ID = "You tried to persist an object with a bad ID. Don't play with this.";

var ID_LENGTH = 24;

module.exports = {
    checkUrlId: function(req, res, next) {
        req.checkParams('id', BAD_ID).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    },
    checkBodyId: function(req, res, next) {
        req.checkBody('_id', BAD_ID).len(ID_LENGTH, ID_LENGTH).isAlphanumeric();
        next();
    },
    checkValidationErrors: function(req, res, next) {

        var errors = req.validationErrors();
        if (errors) {
            res.status(400).json({errors: req.validationErrors()});
        } else {
            next();
        }
    }
};
