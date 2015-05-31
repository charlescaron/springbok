'use strict';

describe('Edit ticket controller', function() {

    var scope, ticketService, routeParams, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('singleTicketController', {
            $scope: scope,
            ticketService: ticketService,
            $routeParams: routeParams
        });
    }));

    var createMocks = function() {
        ticketService = {
            update: sinon.spy(),
            getSingle: function(id, callback) {callback('Single ticket');},
            saveEvent: function() {return deferred.promise}
        };
        routeParams = {
            id: '123456789012345678901234'
        };
    };

    it('should update an existing ticket', function(){
        scope.ticket = {_id: 1234};
        scope.save();
        expect(ticketService.update).to.have.been.called;
    });

    it('should show the selected ticket using the provided ID', function(){
        scope.$apply();
        expect(scope.ticket).to.equal('Single ticket');
    });

    it('should create a new event for the selected ticket', function(){

        //Fixtures
        scope.ticket = {_id: 1234};
        scope.event = {};
        var expected = 'Ticket with new event';

        //Test
        scope.addEvent();
        deferred.resolve({data: expected});
        scope.$apply();

        //Assertions
        expect(scope.ticket).to.equal(expected);
        expect(scope.event).to.be.null;
    });
});
