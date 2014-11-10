"use strict";

var mongoose = require('mongoose');

var brandSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Brand', brandSchema);

