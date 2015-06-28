'use strict';

springbok.controller('reportController', function($scope, ticketService, clientService, environmentService) {

    $scope.options = {thickness: 10};

    var loadStatistics = function(year, month) {

        //It's going to be about clients or environments
        var mapAggregationBaseData = function(data) {

            var map = {};
            data.forEach(function(element) {
                var color = parseInt(element._id, 16) * 941;
                element.color = '#' + color % 1000000;
                map[element._id] = element;
            });
            return map;
        };

        clientService.getAll(function(data) {

            var clientMap = mapAggregationBaseData(data);

            ticketService.getClientAggregateByMonth(year, month).then(function (data) {

                var aggregate = data.data;
                $scope.clientData = [];
                aggregate.forEach(function(element) {
                    $scope.clientData.push({label: clientMap[element._id].name.substring(0, 16), value: element.count,
                        color: clientMap[element._id].color});
                });
            });
        });

        environmentService.getAll(function(data) {

            var environmentMap = mapAggregationBaseData(data);

            ticketService.getEnvironmentAggregateByMonth(year, month).then(function (data) {

                var aggregate = data.data;
                $scope.environmentData = [];
                aggregate.forEach(function(element) {
                    $scope.environmentData.push({label: environmentMap[element._id].name.substring(0, 16), value: element.count,
                        color: environmentMap[element._id].color});
                });
            });
        });

        ticketService.getOpenedByMonth(year, month).then(function (data) {
            $scope.tickets = data.data;
            $scope.count = $scope.tickets.length;
        });
    };

    $scope.loadPreviousMonth = function() {

        var previousMonth = new Date();
        previousMonth = new Date(previousMonth.setMonth(previousMonth.getMonth() - 1));
        loadStatistics(previousMonth.getFullYear(), previousMonth.getMonth());
    };

    $scope.loadCurrentMonth = function() {

        var now = new Date();
        loadStatistics(now.getFullYear(), now.getMonth());
    };

    //Loads statistics from the previous month when the page loads
    $scope.loadPreviousMonth();

});