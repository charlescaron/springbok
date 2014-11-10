"use strict";

//Third-party libraries
var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

//Internal modules
var staticPath = require('./index');
var ticketsApi = require('./api/tickets/ticket-routes');
var environmentsApi = require('./api/environments/environment-routes');
var brandsApi = require('./api/brands/brand-routes');
var problemsApi = require('./api/problems/problem-routes');
var eventsApi = require('./api/events/event-routes');
var logger = require("./logger");

var app = express();

mongoose.connect(process.env.SPRINGBOK_MONGODB_URL || 'mongodb://localhost/springbok');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(expressValidator()); //Must be immediately after the registration of bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', staticPath);
app.use(morgan('combined', { "stream": logger.stream }));
app.use('/api/tickets', ticketsApi);
app.use('/api/environments', environmentsApi);
app.use('/api/brands', brandsApi);
app.use('/api/problems', problemsApi);
app.use('/api/events', eventsApi);

module.exports = app;
