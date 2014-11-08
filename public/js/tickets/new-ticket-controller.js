'use strict';

springbok.controller('newTicketController', function($scope, ticketService, $location) {

    $scope.save = function() {
        var toSave = $scope.ticket;
        toSave.status = 'active';
        ticketService.save($scope.ticket).then(function(data) {
            $location.path('/tickets/' + data._id);
        });
    };

});

