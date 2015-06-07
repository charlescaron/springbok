'use strict';

describe('Client controller', function() {

    var scope, clientService, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('clientController', {
            $scope: scope,
            clientService: clientService
        });
    }));

    var createMocks = function() {
        clientService = {
            getAll: function(callback) {callback('Client list');},
            save: function() {return deferred.promise},
            update: function() {return deferred.promise}
        };
        sinon.spy(clientService, 'save');
        sinon.spy(clientService, 'update');
    };

    it('should load the list of clients', function(){
        scope.$apply();
        expect(scope.clients).to.equal('Client list');
    });

    it('should save a newly created client', function(){

        //Fixtures
        scope.clients = [];
        scope.newClient = 'Something';

        //Test
        scope.addClient({});
        deferred.resolve({id: 1234});
        scope.$apply();

        //Assertions
        expect(clientService.save).to.have.been.called;
        expect(scope.clients.length).to.equal(1);
        expect(scope.newClient).to.be.null;
    });

    it('should update a selected client', function(){

        //Fixtures
        scope.selectedClient = 'Something';

        //Test
        scope.updateClient({});
        deferred.resolve({id: 1234});
        scope.$apply();

        //Assertions
        expect(clientService.update).to.have.been.called;
        expect(scope.selectedClient).to.be.null;
    });

    it('should show the selected client', function(){
        var selected = 'Details';
        scope.showClientDetails(selected);
        expect(scope.selectedClient).to.equal(selected);
    });

});