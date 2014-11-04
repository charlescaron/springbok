'use strict';

describe('Ticket service', function() {

    var eventService, httpBackend;

    var fakeResource = {
        save: function() {
            return {$promise: ''}
        }
    };

    sinon.spy(fakeResource, 'save');

    var $resource = function() {
        return fakeResource;
    };

    beforeEach(function() {
        module('springbok', function($provide) {
            $provide.value('$resource', $resource);
        });
        inject(function ($injector, $httpBackend) {
            httpBackend = $httpBackend;
            eventService = $injector.get('eventService');
        });
    });

    it('should save a ticket', function(){
        eventService.save();
        expect(fakeResource.save).to.have.been.called;
    });

    it('should get all events for a given ticket', function(){

        //Fixtures
        httpBackend.when('GET', '/api/events/ticket/1234').respond(200, ['An event']);
        var response;
        var callback = function(data) {
            response = data
        }

        //Test
        eventService.getByTicket( 1234, callback);
        httpBackend.flush();
        expect(response[0]).to.equal('An event');
    });

});
