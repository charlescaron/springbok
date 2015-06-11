"use strict";

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ticketSchema = new mongoose.Schema({
    title: { type: String, index: 'text' },
    status: String,
    priority: String,
    description: { type: String, default: '' },
    lastUpdatedOn: Date,
    environment: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment' },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    events: [{date: Date, text: String}]
});

try {
    ticketSchema.plugin(autoIncrement.plugin, {
        model: 'Ticket',
        startAt: 1
    });
} catch (ex) {
    //I really got to find a way to decouple this mongoose related logic from my domain
    // Doing this to make the unit tests work
}

module.exports = mongoose.model('Ticket', ticketSchema);
