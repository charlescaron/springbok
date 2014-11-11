"use strict";

var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    title: String,
    status: String,
    description: String,
    environment: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment' },
    events: [{date: Date, text: String}]
});

module.exports = mongoose.model('Ticket', ticketSchema);
