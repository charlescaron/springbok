"use strict";

springbok.controller('environmentController', function($scope, environmentService) {

    environmentService.getAll(function(data) {
        $scope.environments = data;
    });

    $scope.showEnvironmentDetails = function(environment) {
        $scope.selectedEnvironment = environment;
    };

    $scope.addEnvironment = function(environment) {
        environmentService.save(environment);
    };

});
