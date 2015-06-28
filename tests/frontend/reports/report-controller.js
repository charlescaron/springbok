'use strict';

describe('Ticket reporting controller', function() {

    var scope, ticketService, clientService, environmentService;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('reportController', {
            $scope: scope,
            ticketService: ticketService,
            clientService: clientService,
            environmentService: environmentService
        });
    }));

    var createMocks = function() {
        ticketService = {
            getOpenedByMonth: function() {return {then: function(callback) {callback({data: [{_id: 123456}]})}}},
            getClientAggregateByMonth: function() {return {then:
                function(callback) {callback({data: [{_id: 123456, count: 2}]})
                    }
                }
            },
            getEnvironmentAggregateByMonth: function() {return {then:
                function(callback) {callback({data: [{_id: 123456, count: 2}]})
                }
            }
            }
        };
        clientService = {
            getAll: function(callback) {callback([{_id: 123456, name: 'A name'}]);}
        };
        environmentService = {
            getAll: function(callback) {callback([{_id: 123456, name: 'A name'}]);}
        };
    };

    it('should load the previous month statistics', function(){

        expect(scope.count).to.equal(1);
        expect(scope.tickets[0]._id).to.equal(123456);
        expect(scope.clientData[0].value).to.equal(2);
        expect(scope.clientData[0].color).to.equal('#656286');
        expect(scope.environmentData[0].value).to.equal(2);
        expect(scope.environmentData[0].color).to.equal('#656286');
    });

    it('should load the current month statistics', function(){

        //Erase preloaded data
        scope.environmentData = [];
        scope.clientData = [];
        scope.count = 0;
        scope.tickets = [];

        scope.loadCurrentMonth();
        expect(scope.count).to.equal(1);
        expect(scope.tickets[0]._id).to.equal(123456);
        expect(scope.clientData[0].value).to.equal(2);
        expect(scope.clientData[0].color).to.equal('#656286');
        expect(scope.environmentData[0].value).to.equal(2);
        expect(scope.environmentData[0].color).to.equal('#656286');
    });

});
