'use strict';

describe('Global ticket controller', function() {

    var scope, ticketService, ticketFilters;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('allTicketsController', {
            $scope: scope,
            ticketService: ticketService,
            ticketFilters: ticketFilters
        });
    }));

    var createMocks = function() {
        ticketService = {
            getIdle: function(callback) {callback('Ticket list');}
        },
        ticketFilters = {
            getAll: function() {return 'Filters'}
        }
    };

    it('should load the list of idle tickets at init time', function(){
        scope.$apply();
        expect(scope.tickets).to.equal('Ticket list');
    });

    it('should update the list of tickets based on the selected filter', function(){

        //Fixtures
        var fakeFilter = function(callback) {
            callback(expected);
        };
        var expected = 'Filtered ticket list';

        //Test and assertion
        scope.onFilterChange(fakeFilter);
        expect(scope.tickets).to.equal(expected);
    });

    it('should load the list of ticket filters', function(){
        expect(scope.filters).to.equal('Filters');
    });

});