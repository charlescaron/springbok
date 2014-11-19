'use strict';

describe('Environment controller', function() {

    var scope, envService, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        createMocks();
        $controller('environmentController', {
            $scope: scope,
            environmentService: envService
        });
    }));

    var createMocks = function() {
        envService = {
            getAll: function(callback) {callback('Env list');},
            save: function() {return deferred.promise},
            update: function() {return deferred.promise}
        };
        sinon.spy(envService, 'save');
        sinon.spy(envService, 'update');
    };

    it('should load the list of environments', function(){
        scope.$apply();
        expect(scope.environments).to.equal('Env list');
    });

    it('should save a newly created environment', function(){

        //Fixtures
        scope.environments = [];
        scope.newEnvironment = 'Something';

        //Test
        scope.addEnvironment({});
        deferred.resolve({id: 1234});
        scope.$apply();

        //Assertions
        expect(envService.save).to.have.been.called;
        expect(scope.environments.length).to.equal(1);
        expect(scope.newEnvironment).to.be.null;
    });

    it('should update a selected environment', function(){

        //Fixtures
        scope.selectedEnvironment = 'Something';

        //Test
        scope.updateEnvironment({});
        deferred.resolve({id: 1234});
        scope.$apply();

        //Assertions
        expect(envService.update).to.have.been.called;
        expect(scope.selectedEnvironment).to.be.null;
    });

    it('should show the selected environment', function(){
        var selected = 'Details';
        scope.showEnvironmentDetails(selected);
        expect(scope.selectedEnvironment).to.equal(selected);
    });

});