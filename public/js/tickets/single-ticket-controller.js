'use strict';

springbok.controller('singleTicketController', function($scope, ticketService, $routeParams) {

    var ID_LENGTH = 24;
    var isValidId = function() {
        var candidate = $routeParams.id;
        return angular.isString(candidate) && candidate.length == ID_LENGTH;
    };

    if (isValidId()) {
        ticketService.getSingle({id: $routeParams.id}, function(ticket) {
            $scope.ticket = ticket;
        });
    }

    $scope.save = function() {
        ticketService.update($scope.ticket);
    };

    $scope.addEvent = function() {
        ticketService.saveEvent($scope.ticket._id, $scope.event).then(function(saved) {
            $scope.ticket = saved.data;
            $scope.event = null;
        });
    };
});

