'use strict';

springbok.controller('createController', function($scope, ticketService, environmentService) {

    $scope.ticket = {};

    $scope.environments = environmentService.getAll();

    $scope.problems = [
        "Timeout",
        "Errors",
        "Invalid distance",
        "Invalid regions",
    ]

    $scope.brands = [
        "BEX Hotel search",
        "BEX SEM",
        "Hotel.com",
        "Cruises",
        "Venere",
    ]

    $scope.$watch(
        "ticket",
        function( newValue, oldValue ) {
            $scope.ticket.name =
                ($scope.ticket.problem ? $scope.ticket.problem : " ")
                + ($scope.ticket.env ? " in " + $scope.ticket.env : " ")
                + ($scope.ticket.brand ? " for " + $scope.ticket.brand : " ");
        },
        true
    );

    $scope.selectEnvironment = function(env){
        console.log("select env : " + env);
        if($scope.ticket.env == env){
            console.log("canceling env : " + env);
            $scope.ticket.env = null;
        }
        $scope.ticket.env = env;
    }

    $scope.selectBrand = function(brand){
        console.log("select brand : " + brand);
        if($scope.ticket.brand == brand){
            $scope.ticket.brand = null;
        }
        $scope.ticket.brand = brand;
    }

    $scope.selectProblem = function(problem){
        console.log("select problem : " + problem);
        if($scope.ticket.problem == problem){
            $scope.ticket.problem = null;
        }
        $scope.ticket.problem = problem;
    }

    $scope.createTicket = function(){
        ticketService.save(ticket);
    }
});