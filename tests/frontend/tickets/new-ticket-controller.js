'use strict';

describe('Create new ticket controller', function() {

    var scope, ticketService;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('newTicketController', {
            $scope: scope,
            ticketService: ticketService
        });
    }));

    var createMocks = function() {
        ticketService = {
            save: sinon.spy()
        };
    };

    it('should save a newly created ticket', function(){
        scope.ticket = {};
        scope.save();
        expect(ticketService.save).to.have.been.called;
    });
});
