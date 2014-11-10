"use strict";

var mongoose = require('mongoose');

var problemSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Problem', problemSchema);