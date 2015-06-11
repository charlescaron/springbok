'use strict';

springbok.controller('createTicketController', function($scope, $location, ticketService, environmentService, problemService, clientService) {

    $scope.ticket = {};
    $scope.environments = environmentService.getAll();
    $scope.problems = problemService.getAll();
    $scope.clients = clientService.getAll();
    ticketService.getPriorities(function(response) {
        $scope.priorities = response;
    });

    /**
     * Creation of new tickets
     */

    $scope.buildTicketName = function(){
        $scope.ticket.name =
            ($scope.ticket.problem ? $scope.ticket.problem.name : " ") +
            ($scope.ticket.env ? " in " + $scope.ticket.env.name : " ") +
            ($scope.ticket.client ? " for " + $scope.ticket.client.name : " ");
    };

    $scope.selectEnvironment = function(env) {
        if ($scope.ticket.env && $scope.ticket.env._id == env._id) {
            $scope.ticket.env = null;
        } else {
            $scope.ticket.env = env;
        }
    };

    $scope.selectClient = function(client){
        if($scope.ticket.client && $scope.ticket.client._id == client._id){
            $scope.ticket.client = null;
        }else {
            $scope.ticket.client = client;
        }
    };

    $scope.selectProblem = function(problem){
        if($scope.ticket.problem && $scope.ticket.problem._id == problem._id){
            $scope.ticket.problem = null;
        }else {
            $scope.ticket.problem = problem;
        }
    };

    $scope.createTicket = function(){
        var ticket = {
            status: "open",
            title: $scope.ticket.name,
            description: $scope.ticket.description,
            priority: $scope.ticket.priority
        };
        if ($scope.ticket.client) {
            ticket.client = $scope.ticket.client._id;
        }
        if ($scope.ticket.env) {
            ticket.environment = $scope.ticket.env._id;
        }
        if ($scope.ticket.problem) {
            ticket.problem = $scope.ticket.problem._id;
        }

        ticketService.save(ticket).then(
            function(ticket){
                $location.path('/tickets/' + ticket._id);
            },
            function(error){
                $scope.error = error;
            }
        );
    };

    /**
     * Creation of additional dependencies (environments, clients, problems)
     */
    $scope.createEnvironment = function(){
        environmentService.save({
            name: $scope.newEnvironment
        }).then(function(){
            $scope.newEnvironment = null;
            $scope.environments = environmentService.getAll();
        });
    };

    $scope.createProblem = function(){
        problemService.save({
            name: $scope.newProblem
        }).then(function(){
            $scope.newProblem = null;
            $scope.problems = problemService.getAll();
        });
    };


    $scope.createClient = function(){
        clientService.save({
            name: $scope.newClient
        }).then(function(){
            $scope.newClient = null;
            $scope.clients = clientService.getAll();
        });
    };
});