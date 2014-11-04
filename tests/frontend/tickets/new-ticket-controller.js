'use strict';

describe('Create new ticket controller', function() {

    var scope, ticketService, locationService, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('newTicketController', {
            $scope: scope,
            $location: locationService,
            ticketService: ticketService
        });
    }));

    var createMocks = function() {
        ticketService = {
            save: function() {return deferred.promise}
        };
        locationService = {
            path: sinon.spy()
        }
    };

    it('should save a newly created ticket', function(){
        scope.ticket = {};
        scope.save();
        deferred.resolve({_id: 1234});
        scope.$apply();
        expect(locationService.path).to.have.been.calledWith('/tickets/1234');
    });
});
