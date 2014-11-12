/*jshint -W079 */
"use strict";

var springbok = angular.module('springbok', ['ngRoute', 'ngResource']);

springbok.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/active_tickets.html',
            controller  : 'allTicketsController'
        })
        .when('/tickets/new', {
            templateUrl : 'views/create_ticket.html',
            controller  : 'createTicketController'
        })
        .when('/tickets/:id', {
            templateUrl : 'views/edit_ticket.html',
            controller  : 'singleTicketController'
        })
        .when('/environments', {
            templateUrl : 'views/environments.html',
            controller  : 'environmentController'
        });

});
