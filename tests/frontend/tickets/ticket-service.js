'use strict';

describe('Ticket service', function() {

    var ticketService;

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
          ticketService = $injector.get('ticketService');
       });
    });

    it('should save a ticket', function(){
        ticketService.save();
        expect(fakeResource.save).to.have.been.called;
    });

    it('should get a ticket by ID', function(){
        ticketService.getSingle();
        expect(fakeResource.get).to.have.been.called;
    });

    it('should get all active tickets', function(){
        ticketService.getAllActive();
        expect(fakeResource.query).to.have.been.called;
    });

});