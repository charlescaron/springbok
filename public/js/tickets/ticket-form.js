'use strict';

springbok.directive('ticketForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/partials/ticket_form.html',
        controller: function($scope, environmentService, ticketService, problemService, brandService) {

            environmentService.getAll(function(data) {
                $scope.environments = data;
            });

            ticketService.getStatuses(function(data) {
                $scope.statuses = data;
            });

            ticketService.getPriorities(function(data) {
                $scope.priorities = data;
            });

            problemService.getAll(function(data) {
                $scope.problems = data;
            });

            brandService.getAll(function(data) {
                $scope.brands = data;
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
