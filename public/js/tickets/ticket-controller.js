"use strict";

springbok.controller('ticketController', function($scope, ticketService) {

    ticketService.getAllActive(function(data) {
        $scope.tickets = data;
    });

    $scope.saveTicket = function(toSave) {
        toSave.status = 'active';
        ticketService.save(toSave);
    };

    $scope.loadTicket = function(id) {
        ticketService.getSingle({id: id}, function(data) {
            $scope.ticket = data;
        });
    };


});