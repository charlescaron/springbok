'use strict';

springbok.directive('clientForm', function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/partials/client_form.html',
        scope: {
            title: '@',
            callback: '&',
            client: '=',
            submitIcon: '@'
        }
    };
});
