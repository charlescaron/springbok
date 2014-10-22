"use strict";

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    date: Date,
    text: String,
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
});

module.exports = mongoose.model('Event', eventSchema);
