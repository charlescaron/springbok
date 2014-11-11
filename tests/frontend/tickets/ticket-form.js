'use strict';

describe('Ticket form directive', function() {

    var ticketForm, scope;

    var environmentService = {
        getAll: function(callback) {callback('Env list');}
    };

    var ticketService = {
        getStatuses: function(callback) {callback('List');}
    };

    beforeEach(function() {
        module('springbok', 'templates', function($provide) {
            $provide.value('environmentService', environmentService);
            $provide.value('ticketService', ticketService);
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

    it('should load the list of ticket status', function(){
        ticketForm.isolateScope().$apply();
        expect(ticketForm.isolateScope().statuses).to.equal('List');
    });
});