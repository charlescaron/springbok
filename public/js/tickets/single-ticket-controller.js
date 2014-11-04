'use strict';

springbok.controller('singleTicketController', function($scope, ticketService, $routeParams, eventService) {

    var ID_LENGTH = 24;
    var isValidId = function() {
        var candidate = $routeParams.id;
        return angular.isString(candidate) && candidate.length == ID_LENGTH;
    };

    if (isValidId()) {
        ticketService.getSingle({id: $routeParams.id}, function(ticket) {
            $scope.ticket = ticket;
            eventService.getByTicket(ticket._id, function (events) {
                $scope.events = events;
            });
        });
    }

    $scope.save = function() {
        ticketService.update($scope.ticket);
    };

    $scope.addEvent = function() {
        $scope.event.ticket = $scope.ticket._id;
        eventService.save($scope.event).then(function(saved) {
            $scope.events.unshift(saved);
            $scope.event = null;
        });
    };
});

