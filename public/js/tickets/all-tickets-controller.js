"use strict";

springbok.controller('allTicketsController', function($scope, ticketService, ticketFilters) {

    $scope.filters = ticketFilters.getAll();

    ticketService.getIdle(function(data) {
        $scope.tickets = data;
    });

    $scope.onFilterChange = function(filterFunction) {

        filterFunction(function (data) {
           $scope.tickets = data;
        });
    };
});
