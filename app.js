"use strict";

var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var staticPath = require('./index');
var ticketsApi = require('./api/tickets/ticket-routes');
var environmentsApi = require('./api/environments/environment-routes');
var eventsApi = require('./api/events/event-routes');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(process.env.SPRINGBOK_MONGODB_URL || 'mongodb://localhost/springbok');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(expressValidator()); //Must be immediately after the registration of bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', staticPath);
app.use('/api', ticketsApi);
app.use('/api', environmentsApi);
app.use('/api', eventsApi);

module.exports = app;
