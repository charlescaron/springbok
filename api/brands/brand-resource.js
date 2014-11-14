"use strict";

var mongoose = require('mongoose');

var brandSchema = new mongoose.Schema({
    name: String,
    description: { type: String, default: '' }
});

module.exports = mongoose.model('Brand', brandSchema);

