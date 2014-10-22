'use strict';

var expect = require("chai").expect;
var Event = require('../../../api/events/event-resource');

describe('the structure of the Event model', function(){

    it('should have the required basic information', function(){

        expect(Event.modelName).to.equal('Event');
        expect(Event.schema.paths).to.have.property('date');
        expect(Event.schema.paths).to.have.property('text');
        expect(Event.schema.paths).to.have.property('ticket');
    });

});