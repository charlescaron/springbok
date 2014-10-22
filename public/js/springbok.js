/*jshint -W079 */
"use strict";

var springbok = angular.module('springbok', ['ngRoute', 'ngResource']);

springbok.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/active_tickets.html',
            controller  : 'ticketController'
        })
        .when('/tickets/new', {
            templateUrl : 'views/create_ticket.html',
            controller  : 'ticketController'
        })
        .when('/tickets/:id', {
            templateUrl : 'views/ticket.html',
            controller  : 'ticketController'
        })

        .when('/environments', {
            templateUrl : 'views/environments.html',
            controller  : 'environmentController'
        });

});
