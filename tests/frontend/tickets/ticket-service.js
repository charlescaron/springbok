'use strict';

describe('Ticket service', function() {

    var ticketService;

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
       inject(function ($injector) {
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

    it('should get available statuses for a ticket', function(){
        ticketService.getStatuses();
        expect(fakeResource.query).to.have.been.called;
    });

});