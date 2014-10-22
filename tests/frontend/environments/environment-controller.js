'use strict';

describe('Environment controller', function() {

    var scope, envService;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createMocks();
        $controller('environmentController', {
            $scope: scope,
            environmentService: envService
        });
    }));

    var createMocks = function() {
        envService = {
            getAll: function(callback) {callback('Env list');},
            save: sinon.spy()
        }
    };

    it('should load the list of environments', function(){
        scope.$apply();
        expect(scope.environments).to.equal('Env list');
    });

    it('should save a newly created environment', function(){
        scope.addEnvironment({});
        expect(envService.save).to.have.been.called;
    });

    it('should show the selected environment', function(){
        var selected = 'Details';
        scope.showEnvironmentDetails(selected);
        expect(scope.selectedEnvironment).to.equal(selected);
    });

});