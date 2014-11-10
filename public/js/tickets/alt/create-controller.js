'use strict';

springbok.controller('createController', function($scope, $location, ticketService, environmentService, problemService, brandService) {

    $scope.ticket = {};

    $scope.environments = environmentService.getAll();

    $scope.problems = problemService.getAll();

    $scope.brands = brandService.getAll();


    /**
     * Creation of new tickets
     */

    $scope.$watch(
        "ticket",
        function( newValue, oldValue ) {
            $scope.ticket.name =
                ($scope.ticket.problem ? $scope.ticket.problem.name : " ") +
                ($scope.ticket.env ? " in " + $scope.ticket.env.name : " ") +
                ($scope.ticket.brand ? " for " + $scope.ticket.brand.name : " ");
        },
        true
    );

    $scope.selectEnvironment = function(env) {
        if ($scope.ticket.env && $scope.ticket.env._id == env._id) {
            $scope.ticket.env = null;
        } else {
            $scope.ticket.env = env;
        }
    };

    $scope.selectBrand = function(brand){
        if($scope.ticket.brand && $scope.ticket.brand._id == brand._id){
            $scope.ticket.brand = null;
        }else {
            $scope.ticket.brand = brand;
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
            environment: $scope.ticket.env._id,
            brand: $scope.ticket.brand._id,
            problem: $scope.ticket.problem._id,
            severity: $scope.ticket.severity
        };
        ticketService.save(ticket).then(
            function(){
                $location.path("/");
            },
            function(error){
                $scope.errorMsg = error;
            }
        );
    };


    /**
     * Creation of additional dependencies (environments, brands, problems)
     */
    $scope.createEnvironment = function(){
        environmentService.save({
            name: $scope.newEnvironment
        }).then(function(){
            $scope.environments = environmentService.getAll();
        });
    };

    $scope.createProblem = function(){
        problemService.save({
            name: $scope.newProblem
        }).then(function(){
            $scope.problems = problemService.getAll();
        });
    };


    $scope.createBrand = function(){
        brandService.save({
            name: $scope.newBrand
        }).then(function(){
            $scope.brands = brandService.getAll();
        });
    };
});