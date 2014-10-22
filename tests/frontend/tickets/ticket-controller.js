'use strict';

describe('Ticket controller', function() {

    var scope, ticketService;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('ticketController', {
            $scope: scope,
            ticketService: ticketService
        });
    }));

    var createMocks = function() {
        ticketService = {
            getAllActive: function(callback) {callback('Ticket list');},
            save: sinon.spy(),
            getSingle: function(id, callback) {callback('Single ticket');}
        }
    };

    it('should load the list of active tickets', function(){
        scope.$apply();
        expect(scope.tickets).to.equal('Ticket list');
    });

    it('should save a newly created ticket', function(){
        scope.saveTicket({});
        expect(ticketService.save).to.have.been.called;
    });

    it('should show the selected ticket', function(){
        scope.loadTicket({});
        expect(scope.ticket).to.equal('Single ticket');
    });

});