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
            getAllActive: function(callback) {callback('Ticket list');}
        },
        ticketFilters = {
            getAll: function() {return 'Filters'}
        }
    };

    it('should load the list of active tickets', function(){
        scope.$apply();
        expect(scope.tickets).to.equal('Ticket list');
    });

    it('should load the list of ticket filters', function(){
        expect(scope.filters).to.equal('Filters');
    });

});