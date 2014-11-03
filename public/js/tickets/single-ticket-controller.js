"use strict";

springbok.controller('singleTicketController', function($scope, ticketService, $routeParams) {

    var ID_LENGTH = 24;
    var isValidId = function() {
        var candidate = $routeParams.id;
        return angular.isString(candidate) && candidate.length == ID_LENGTH;
    };

    if (isValidId()) {
        ticketService.getSingle({id: $routeParams.id}, function(data) {
            $scope.ticket = data;
        });
    }

    $scope.saveTicket = function() {

        var toSave = $scope.ticket;

        if (toSave._id) {
            ticketService.update(toSave);
        } else {
            toSave.status = 'active';
            ticketService.save(toSave);
        }
    };


});

