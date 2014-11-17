'use strict';

springbok.directive('ticketForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/partials/ticket_form.html',
        controller: function($scope, environmentService, ticketService, problemService) {

            environmentService.getAll(function(data) {
                $scope.environments = data;
            });

            ticketService.getStatuses(function(data) {
                $scope.statuses = data;
            });

            problemService.getAll(function(data) {
                $scope.problems = data;
            });
        },
        scope: {
            title: '@',
            callback: '&',
            ticket: '=',
            submitIcon: '@'
        }
    };
});
