"use strict";

var mongoose = require('mongoose');

var problemSchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: '' }
});

module.exports = mongoose.model('Problem', problemSchema);