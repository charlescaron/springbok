'use strict';

describe('Environment service', function() {

    var envService;

    var fakeResource = {
        save: function() {
            return {$promise: ''}
        },
        update: function() {
            return {$promise: ''}
        },
        query: sinon.spy()
    };

    sinon.spy(fakeResource, 'save');
    sinon.spy(fakeResource, 'update');

    var $resource = function() {
        return fakeResource;
    };

    beforeEach(function() {
        module('springbok', function($provide) {
            $provide.value('$resource', $resource);
        });
        inject(function ($injector) {
            envService = $injector.get('environmentService');
        });
    });

    it('should save an environment', function(){
        envService.save();
        expect(fakeResource.save).to.have.been.called;
    });

    it('should update an environment', function(){
        envService.update({_id: 1234});
        expect(fakeResource.update).to.have.been.called;
    });

    it('should get all environments', function(){
        envService.getAll();
        expect(fakeResource.query).to.have.been.called;
    });

});
