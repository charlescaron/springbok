'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var reportingRepo = require('../../../api/tickets/reporting-repo');
var Ticket = require('../../../api/tickets/ticket-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the Ticket reporting API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Ticket, 'find');
        sinon.spy(Ticket, 'aggregate');
        sinon.spy(Ticket, 'sort');
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

        Ticket.aggregate = function(query, callback) {
            callback(undefined, {});
        };

        Ticket.exec = function(callback) {
            callback(undefined, {});
        };
    };

    it('should get all tickets opened in a specific month', function(){
        reportingRepo.getOpenedByMonth({query: {year: 2015, month: 0}}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should aggregate tickets opened in a specific month by client', function(){
        reportingRepo.getClientAggregate({query: {year: 2015, month: 0}}, fakeResponse);
        expect(Ticket.aggregate).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should aggregate tickets opened in a specific month by environment', function(){
        reportingRepo.getEnvironmentAggregate({query: {year: 2015, month: 0}}, fakeResponse);
        expect(Ticket.aggregate).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Ticket.find.restore();
        Ticket.aggregate.restore();
        Ticket.sort.restore();
    });

});
