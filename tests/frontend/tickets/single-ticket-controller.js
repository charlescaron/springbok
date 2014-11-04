'use strict';

describe('Edit ticket controller', function() {

    var scope, ticketService, routeParams, eventService, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('singleTicketController', {
            $scope: scope,
            ticketService: ticketService,
            eventService: eventService,
            $routeParams: routeParams
        });
    }));

    var createMocks = function() {
        ticketService = {
            update: sinon.spy(),
            getSingle: function(id, callback) {callback('Single ticket');}
        };
        eventService = {
            getByTicket: function(id, callback) {callback('Events');},
            save: function() {return deferred.promise}
        }
        routeParams = {
            id: '123456789012345678901234'
        };
    };

    it('should update an existing ticket', function(){
        scope.ticket = {_id: 1234};
        scope.save();
        expect(ticketService.update).to.have.been.called;
    });

    it('should show the selected ticket if a valid ID is provided', function(){
        scope.$apply();
        expect(scope.ticket).to.equal('Single ticket');
        expect(scope.events).to.equal('Events');
    });

    it('should create a new event for the selected ticket', function(){

        //Fixtures
        scope.ticket = {_id: 1234};
        scope.event = {};
        scope.events = ['Event 0'];

        //Test
        scope.addEvent();
        deferred.resolve('Event 1');
        scope.$apply();

        //Assertions
        expect(scope.events[0]).to.equal('Event 1');
        expect(scope.event).to.be.null;
    });
});
