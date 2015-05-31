'use strict';

springbok.controller('searchController', function($scope, ticketService, $location) {

    $scope.search = function(text) {

        return ticketService.search(text).then(function(response) {
            return response.data;
        });
    };

    $scope.select = function(id) {
        $location.path('/tickets/' + id);
    };
});

