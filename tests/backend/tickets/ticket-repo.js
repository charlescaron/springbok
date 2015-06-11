'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var ticketRepo = require('../../../api/tickets/ticket-repo');
var Ticket = require('../../../api/tickets/ticket-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the ticket API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Ticket, 'find');
        sinon.spy(Ticket, 'sort');
        sinon.spy(Ticket, 'findById');
        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Ticket.find = function() {
            return this;
        };

        Ticket.sort = function() {
            return this;
        };

        Ticket.exec = function(callback) {
            callback(undefined, {});
        };

        Ticket.findOneAndUpdate = function(id, query, callback) {
            callback(undefined, {});
        };
    };

    it('should get all active tickets sorted by date', function(){
        ticketRepo.getAllActive({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get all closed tickets sorted by date', function(){
        ticketRepo.getAllClosed({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get idle tickets sorted by date', function(){
        ticketRepo.getIdle({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get on hold tickets sorted by date', function(){
        ticketRepo.getOnHold({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get in progress tickets sorted by date', function(){
        ticketRepo.getInProgress({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get a ticket by ID', function(){
        ticketRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Ticket.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should update an existing ticket', function(){
        ticketRepo.update({body: {title: 'Test', description: 'Test', environment: 1234}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get all possible statuses for a ticket', function(){
        ticketRepo.getStatuses({}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get all possible priorities for a ticket', function(){
        ticketRepo.getPriorities({}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should add an event to an existing ticket', function(){
        ticketRepo.addEvent({text: 'Event text', params: {id: 1234}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Ticket.find.restore();
        Ticket.sort.restore();
        Ticket.findById.restore();
    });

});
