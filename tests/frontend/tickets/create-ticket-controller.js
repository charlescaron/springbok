'use strict';

describe('Create new ticket controller', function() {

    var scope, ticketService, environmentService, brandService, problemService, location, deferred;

    beforeEach(module('springbok'));

    beforeEach(inject(function($rootScope, $controller, $q) {
        deferred = $q.defer();
        scope = $rootScope.$new();
        createMocks();
        $controller('createTicketController', {
            $scope: scope,
            ticketService: ticketService,
            environmentService: environmentService,
            brandService: brandService,
            problemService: problemService,
            $location: location
        });
    }));

    var createMocks = function() {
        location = {
            path: sinon.spy()
        }
        ticketService = {
            save: function() {return deferred.promise;}
        },
        environmentService = {
            getAll: function() { return 'Environments list'; },
            save: function(param){return deferred.promise;}
        },
        brandService = {
            getAll: function() { return 'Brands list'; },
            save: function(param){return deferred.promise;}
        },
        problemService = {
            getAll: function() { return 'Problems list'; },
            save: function(param){return deferred.promise;}
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
        deferred.resolve();
        scope.$apply();
        expect(scope.newEnvironment).to.be.null;
        expect(scope.environments).to.equal('Environments list');
    });

    it('should create a new problem', function(){
        scope.newProblem = "test";
        scope.createProblem();
        deferred.resolve();
        scope.$apply();
        expect(scope.newProblem).to.be.null;
        expect(scope.problems).to.equal('Problems list');
    });

    it('should create a new brand', function(){
        scope.newBrand = "test";
        scope.createBrand();
        deferred.resolve();
        scope.$apply();
        expect(scope.newBrand).to.be.null;
        expect(scope.brands).to.equal('Brands list');
    });

    it('should name the ticket after the problem, brand and environment', function(){
        scope.ticket.problem = {name: "problem"};
        scope.ticket.env = {name: "environment"};
        scope.ticket.brand = {name: "brand"};
        scope.$apply();
        expect(scope.ticket.name).to.equal("problem in environment for brand");
    });

    it('should create a new ticket', function() {

        scope.ticket = {};
        scope.createTicket();
        deferred.resolve({_id: 1234});
        scope.$apply();
        expect(location.path).to.have.been.calledWith('/tickets/1234');
    });
});