"use strict";

springbok.controller('environmentController', function($scope, environmentService) {

    //Retrieves all environments when loading the page
    environmentService.getAll(function(data) {
        $scope.environments = data;
    });

    $scope.showEnvironmentDetails = function(environment) {
        $scope.selectedEnvironment = environment;
    };

    $scope.addEnvironment = function(environment) {
        var promise = environmentService.save(environment);
        promise.then(function(data) {
            $scope.environments.push(data);
            $scope.newEnvironment = null;
        });
    };

    $scope.updateEnvironment = function(environment) {
        var promise = environmentService.update(environment);
        promise.then(function(data) {
            $scope.selectedEnvironment = null;
        });
    };

});
