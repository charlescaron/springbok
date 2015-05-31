'use strict';

var expect = require('chai').expect;
var Priorities = require('../../../api/tickets/ticket-priority');

describe('the list of possible priorities for a ticket', function(){

    it('should return a list of available priorities', function(){
        expect(Priorities.getAll()[0]).to.have.property('id');
        expect(Priorities.getAll()[0]).to.have.property('shortLabel');
        expect(Priorities.getAll()[0]).to.have.property('longLabel');
    });

    it('should return a list of status IDs matching the global status list', function(){
        expect(typeof Priorities.getIds()[0]).to.equal('string');
    });

    it('should return a list of status labels matching the global status list', function(){
        expect(typeof Priorities.getLabels()[0]).to.equal('string');
    });
});
