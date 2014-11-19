'use strict';

var TEXT_MAX_LENGTH = 2000;

var BAD_DESC = "The event description cannot have more than " + TEXT_MAX_LENGTH + " characters";

module.exports = {
    checkCreationAttributes: function(req, res, next) {
        req.checkBody('text', BAD_DESC).len(1, TEXT_MAX_LENGTH);
        next();
    }
};

