'use strict';

describe('Create new ticket controller', function() {

    var scope, ticketService, environmentService, brandService, problemService, location, q;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        q = $q;
        scope = $rootScope.$new();
        createMocks();
        $controller('createController', {
            $scope: scope,
            ticketService: ticketService,
            environmentService: environmentService,
            brandService: brandService,
            problemService: problemService,
            location: location
        });
    }));

    var createMocks = function() {
        location = {
            path: sinon.spy()
        }
        ticketService = {
            save: function(){
                var defer = q.defer();
                defer.resolve();
                return defer.promise;
            }
        },
        environmentService = {
            getAll: function() { return 'Environments list'; },
            save: function(param){
                var defer = q.defer();
                defer.resolve(param);
                return defer.promise;
            }
        },
        brandService = {
            getAll: function() { return 'Brands list'; },
            save: function(param){
                var defer = q.defer();
                defer.resolve(param);
                return defer.promise;
            }
        },
        problemService = {
            getAll: function() { return 'Problems list'; },
            save: function(param){
                var defer = q.defer();
                defer.resolve(param);
                return defer.promise;
            }
        }
};


    it('should select an environment', function(){
        scope.selectEnvironment({_id: "1", name: "test"})
        expect(scope.ticket.env).to.deep.equal({_id: "1", name: "test"});
    });

    it('should unselect an environment', function(){
        scope.selectEnvironment({_id: "1", name: "test"});
        scope.selectEnvironment({_id: "1", name: "test"});
        expect(scope.ticket.env).to.be.null;
    });

    it('should select a brand', function(){
        scope.selectBrand({_id: "1", name: "test"})
        expect(scope.ticket.brand).to.deep.equal({_id: "1", name: "test"});
    });

    it('should unselect a brand', function(){
        scope.selectBrand({_id: "1", name: "test"});
        scope.selectBrand({_id: "1", name: "test"});
        expect(scope.ticket.brand).to.be.null;
    });

    it('should select a problem', function(){
        scope.selectProblem({_id: "1", name: "test"})
        expect(scope.ticket.problem).to.deep.equal({_id: "1", name: "test"});
    });

    it('should unselect a problem', function(){
        scope.selectProblem({_id: "1", name: "test"});
        scope.selectProblem({_id: "1", name: "test"});
        expect(scope.ticket.problem).to.be.null;
    });

    it('should create a new environment', function(){
        scope.newEnvironment = "test";
        scope.createEnvironment();

        //TODO find a way to test that brand service has been called with { name: 'test' }
        expect(scope.environments).to.equal('Environments list');
    });

    it('should create a new problem', function(){
        scope.newProblem = "test";
        scope.createProblem();

        //TODO find a way to test that problem service has been called with { name: 'test' }
        expect(scope.problems).to.equal('Problems list');
    });

    it('should create a new brand', function(){
        scope.newBrand = "test";
        scope.createBrand();

        //TODO find a way to test that environment service has been called with { name: 'test' }
        expect(scope.brands).to.equal('Brands list');
    });

    it('should name the ticket after the problem, brand and environment', function(){
        scope.ticket.problem = {name: "problem"};
        scope.ticket.env = {name: "environment"};
        scope.ticket.brand = {name: "brand"};
        scope.$digest();
        expect(scope.ticket.name).to.equal("problem in environment for brand");
    });

    /*it('should redirect to tickets page after creation', function(){
        scope.createTicket();
        expect(location.path).to.have.been.calledWith("/");
    });*/

/*    it('should create a ticket', function() {
        var deferred = q.defer();
        sinon.stub(ticketService, 'save').returns(deferred.promise);
        deferred.resolve();

        expect(ticketService.save).to.have.been.calledWith();
    });*/
});