'use strict';

describe('Client form directive', function() {

    var clientForm, scope;

    beforeEach(function() {
        module('springbok', 'templates');

        inject(function($compile, $rootScope) {

            scope = $rootScope.$new();
            scope.selectedClient = {};
            scope.updateClient = function(client) {};
            var element = angular.element('<client-form callback="updateClient(selectedClient)" client="selectedClient"' +
                'submit-icon="icon" title="Title" />');
            clientForm = $compile(element)(scope);
            scope.$digest();
        });
    });

    it('should have the required title and submit button icon', function(){
        expect(clientForm.html()).to.contain('Title');
        expect(clientForm.html()).to.contain('icon');
    });

});
