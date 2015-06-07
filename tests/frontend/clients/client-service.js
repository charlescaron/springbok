'use strict';

describe('Client service', function() {

    var clientService;

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
            clientService = $injector.get('clientService');
        });
    });

    it('should save a client', function(){
        clientService.save();
        expect(fakeResource.save).to.have.been.called;
    });

    it('should update a client', function(){
        clientService.update({_id: 1234});
        expect(fakeResource.update).to.have.been.called;
    });

    it('should get all clients', function(){
        clientService.getAll();
        expect(fakeResource.query).to.have.been.called;
    });

});
