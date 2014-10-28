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
        sinon.spy(Ticket, 'findById');
        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Ticket.find = function(query, callback) {
            callback(undefined, {});
        };
    };

    it('should get all active tickets', function(){

        ticketRepo.getAllActive({}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get a ticket by ID', function(){

        ticketRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Ticket.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should create a new ticket', function(){

        ticketRepo.create({body: {title: 'Test', status: 'active', environment: 1234}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Ticket.find.restore();
        Ticket.findById.restore();
    });

});
