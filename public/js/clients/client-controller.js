"use strict";

springbok.controller('clientController', function($scope, clientService) {

    //Retrieves all clients when loading the page
    clientService.getAll(function(data) {
        $scope.clients = data;
    });

    $scope.showClientDetails = function(client) {
        $scope.selectedClient = client;
    };

    $scope.addClient = function(client) {
        var promise = clientService.save(client);
        promise.then(function(data) {
            $scope.clients.push(data);
            $scope.newClient = null;
        });
    };

    $scope.updateClient = function(client) {
        var promise = clientService.update(client);
        promise.then(function(data) {
            $scope.selectedClient = null;
        });
    };

});
