"use strict";

var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    title: String,
    status: String,
    description: { type: String, default: '' },
    environment: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment' },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    events: [{date: Date, text: String}]
});

module.exports = mongoose.model('Ticket', ticketSchema);
