"use strict";

var mongoose = require('mongoose');

var environmentSchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: '' }
});

module.exports = mongoose.model('Environment', environmentSchema);

