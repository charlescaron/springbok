"use strict";

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: '' }
});

module.exports = mongoose.model('Client', clientSchema);

