'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var searchService = require('../../../api/tickets/search-service');
var Ticket = require('../../../api/tickets/ticket-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the ticket search API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Ticket, 'find');
        sinon.spy(Ticket, 'limit');
        sinon.spy(Ticket, 'sort');
        sinon.spy(Ticket, 'exec');
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

        Ticket.limit = function() {
            return this;
        };

        Ticket.sort = function() {
            return this;
        };

        Ticket.exec = function(callback) {
            callback(undefined, {});
        };
    };

    it('should search for the specified text', function(){
        searchService.search({query: {q: 'Text'}}, fakeResponse);
        expect(Ticket.find).to.have.been.called;
        expect(Ticket.limit).to.have.been.called;
        expect(Ticket.sort).to.have.been.called;
        expect(Ticket.exec).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Ticket.find.restore();
        Ticket.limit.restore();
        Ticket.sort.restore();
        Ticket.exec.restore();
    });

});
