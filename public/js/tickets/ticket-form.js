'use strict';

springbok.directive('ticketForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/partials/ticket_form.html',
        controller: function($scope, environmentService) {

            environmentService.getAll(function(data) {
                $scope.environments = data;
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
