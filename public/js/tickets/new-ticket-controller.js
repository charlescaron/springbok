'use strict';

springbok.controller('newTicketController', function($scope, ticketService) {

    $scope.save = function() {
        var toSave = $scope.ticket;
        toSave.status = 'active';
        ticketService.save($scope.ticket);
    };


});

