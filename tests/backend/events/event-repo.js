'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var eventRepo = require('../../../api/events/event-repo');
var Event = require('../../../api/events/event-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the event API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Event, 'find');
        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Event.find = function(query, callback) {
            callback(undefined, {});
        };
    };

    it('should get all events associated to a ticket', function(){

        eventRepo.getByTicketId({params: {id: 1234}}, fakeResponse);
        expect(Event.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should create a new event for a ticket', function(){

        eventRepo.create({body: {date: new Date(), text: 'Test', ticket: 1234}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Event.find.restore();
    });

});