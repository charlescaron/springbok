"use strict";

springbok.controller('allTicketsController', function($scope, ticketService, ticketFilters) {

    ticketService.getAllActive(function(data) {
        $scope.tickets = data;
    });

    $scope.filters = ticketFilters.getAll();
});
