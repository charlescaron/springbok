"use strict";

springbok.controller('allTicketsController', function($scope, ticketService, ticketFilters) {

    $scope.filters = ticketFilters.getAll();
    $scope.selectedFilter = $scope.filters[0];

    ticketService.getIdle(function(data) {
        $scope.tickets = data;
    });

    $scope.onFilterChange = function(selectedFilter) {

        $scope.selectedFilter = selectedFilter;
        selectedFilter.loadFunction(function (data) {
           $scope.tickets = data;
        });
    };
});
