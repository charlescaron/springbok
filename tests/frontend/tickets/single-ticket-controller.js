'use strict';

describe('Single ticket controller', function() {

    var scope, ticketService, routeParams;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('singleTicketController', {
            $scope: scope,
            ticketService: ticketService,
            $routeParams: routeParams
        });
    }));

    var createMocks = function() {
        ticketService = {
            save: sinon.spy(),
            update: sinon.spy(),
            getSingle: function(id, callback) {callback('Single ticket');}
        };
        routeParams = {
            id: '123456789012345678901234'
        };
    };

    it('should save a newly created ticket', function(){
        scope.ticket = {};
        scope.saveTicket();
        expect(ticketService.save).to.have.been.called;
    });

    it('should update an existing ticket', function(){
        scope.ticket = {_id: 1234};
        scope.saveTicket();
        expect(ticketService.update).to.have.been.called;
    });

    it('should show the selected ticket if a valid ID is provided', function(){

        scope.$apply();
        expect(scope.ticket).to.equal('Single ticket');
    });

});
