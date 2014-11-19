'use strict';

springbok.directive('environmentForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/partials/environment_form.html',
        scope: {
            title: '@',
            callback: '&',
            environment: '=',
            submitIcon: '@'
        }
    };
});
