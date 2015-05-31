'use strict';

springbok.controller('singleTicketController', function($scope, ticketService, $routeParams) {

    ticketService.getSingle({id: $routeParams.id}, function(ticket) {
        $scope.ticket = ticket;
    });

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

