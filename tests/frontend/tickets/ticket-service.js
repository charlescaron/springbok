'use strict';

describe('Ticket service', function() {

    var ticketService, httpBackend;

    var fakeResource = {
        save: function() {
            return {$promise: ''}
        },
        update: sinon.spy(),
        get: sinon.spy(),
        query: sinon.spy()
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
           ticketService = $injector.get('ticketService');
       });
    });

    it('should save a ticket', function(){
        ticketService.save();
        expect(fakeResource.save).to.have.been.called;
    });

    it('should update an existing ticket', function(){
        ticketService.update({_id: 1234});
        expect(fakeResource.update).to.have.been.called;
    });

    it('should get a ticket by ID', function(){
        ticketService.getSingle();
        expect(fakeResource.get).to.have.been.called;
    });

    it('should get all active tickets', function(){
        ticketService.getAllActive();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get all closed tickets', function(){
        ticketService.getAllClosed();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get idle tickets', function(){
        ticketService.getIdle();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get on hold tickets', function(){
        ticketService.getOnHold();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get tickets in progress', function(){
        ticketService.getInProgress();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get available statuses for a ticket', function(){
        ticketService.getStatuses();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should get available priorities for a ticket', function(){
        ticketService.getPriorities();
        expect(fakeResource.query).to.have.been.called;
    });

    it('should add an event to a new ticket', function(){

        //Fixtures
        httpBackend.when('POST', '/api/tickets/1234/event').respond(200, ['An event']);
        var response;
        var callback = function(res) {
            response = res.data;
        };

        //Test
        ticketService.saveEvent( 1234, {}).then(callback);
        httpBackend.flush();
        expect(response[0]).to.equal('An event');
    });

    it('should search for available tickets', function(){

        //Fixtures
        httpBackend.when('GET', '/api/tickets/search?q=test').respond(200, ['A ticket']);
        var response;
        var callback = function(res) {
            response = res.data;
        };

        //Test
        ticketService.search('test').then(callback);
        httpBackend.flush();
        expect(response[0]).to.equal('A ticket');
    });

});