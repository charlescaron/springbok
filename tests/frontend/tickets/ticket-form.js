'use strict';

describe('Ticket form directive', function() {

    var ticketForm, scope;

    var environmentService = {
        getAll: function(callback) {callback('Env list');}
    };

    var problemService = {
        getAll: function(callback) {callback('Prob list');}
    };

    var ticketService = {
        getStatuses: function(callback) {callback('List');},
        getPriorities: function(callback) {callback('List');}
    };

    var brandService = {
        getAll: function(callback) {callback('Brand list');}
    };

    beforeEach(function() {
        module('springbok', 'templates', function($provide) {
            $provide.value('environmentService', environmentService);
            $provide.value('problemService', problemService);
            $provide.value('ticketService', ticketService);
            $provide.value('brandService', brandService);
        });

        inject(function($compile, $rootScope) {

            scope = $rootScope.$new();
            scope.ticket = {};
            scope.save = function() {};
            var element = angular.element('<ticket-form callback="save()" environment="selectedEnvironment"' +
                'submit-icon="icon" title="Title" />');
            ticketForm = $compile(element)(scope);
            scope.$digest();
        });
    });

    it('should have the required title and submit button icon', function(){
        expect(ticketForm.html()).to.contain('Title');
        expect(ticketForm.html()).to.contain('icon');
    });

    it('should load the list of environments', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().environments).to.equal('Env list');
    });

    it('should load the list of problems', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().problems).to.equal('Prob list');
    });

    it('should load the list of brands', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().brands).to.equal('Brand list');
    });

    it('should load the list of ticket status', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().statuses).to.equal('List');
    });

    it('should load the list of ticket priorities', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().priorities).to.equal('List');
    });
});
