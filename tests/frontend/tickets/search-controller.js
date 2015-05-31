'use strict';

describe('Search ticket controller', function() {

    var scope, ticketService, location, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('searchController', {
            $scope: scope,
            ticketService: ticketService,
            $location: location
        });
    }));

    var createMocks = function() {
        ticketService = {
            search: function() {return deferred.promise}
        };
        sinon.spy(ticketService, 'search');
        location = {
            path: sinon.spy()
        };
    };

    it('should show the detailed page of the selected ticket', function(){

        scope.select(1234);
        expect(location.path).to.have.been.calledWith('/tickets/1234');
    });

    it('should search for tickets', function(){

        //Fixtures
        var expected = 'Matching ticket';

        //Test
        scope.search('Test');
        deferred.resolve({data: expected});
        scope.$apply();

        //Assertions
        expect(ticketService.search).to.have.been.called;
    });
});
