"use strict";

//Third-party libraries
var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var morgan = require('morgan');

//DB Settings
var connection = mongoose.connect(process.env.SPRINGBOK_MONGODB_URL || 'mongodb://localhost/springbok');
autoIncrement.initialize(connection);

//Internal modules
var staticPath = require('./index');
var ticketsApi = require('./api/tickets/ticket-routes');
var environmentsApi = require('./api/environments/environment-routes');
var clientsApi = require('./api/clients/client-routes');
var problemsApi = require('./api/problems/problem-routes');
var logger = require("./logger");

//Express config
var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(expressValidator()); //Must be immediately after the registration of bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Paths mapping
app.use('/', staticPath);
app.use(morgan('combined', { "stream": logger.stream }));
app.use('/api/tickets', ticketsApi);
app.use('/api/environments', environmentsApi);
app.use('/api/clients', clientsApi);
app.use('/api/problems', problemsApi);

module.exports = app;
