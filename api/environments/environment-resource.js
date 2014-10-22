"use strict";

var mongoose = require('mongoose');

var environmentSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Environment', environmentSchema);

