'use strict';

describe('Environment service', function() {

    var envService;

    var fakeResource = {
        save: sinon.spy(),
        get: sinon.spy(),
        query: sinon.spy()
    };

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

    it('should get all environments', function(){
        envService.getAll();
        expect(fakeResource.query).to.have.been.called;
    });

});
