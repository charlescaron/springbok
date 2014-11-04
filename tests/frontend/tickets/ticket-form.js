'use strict';

describe('Ticket form directive', function() {

    var ticketForm, scope;

    beforeEach(function() {
        module('springbok', 'templates');

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

});
