'use strict';

describe('Environment form directive', function() {

    var environmentForm, scope;

    beforeEach(function() {
        module('springbok', 'templates');

        inject(function($compile, $rootScope) {

            scope = $rootScope.$new();
            scope.selectedEnvironment = {};
            scope.updateEnvironment = function(env) {};
            var element = angular.element('<environment-form callback="updateEnvironment(selectedEnvironment)" environment="selectedEnvironment"' +
                'submit-icon="icon" title="Title" />');
            environmentForm = $compile(element)(scope);
            scope.$digest();
        });
    });

    it('should have the required title and submit button icon', function(){
        expect(environmentForm.html()).to.contain('Title');
        expect(environmentForm.html()).to.contain('icon');
    });

});
