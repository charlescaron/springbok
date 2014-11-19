'use strict';

var expect = require("chai").expect;
var Statuses = require('../../../api/tickets/ticket-status');

describe('the list of possible status for a ticket', function(){

    it('should return a list of available status', function(){
        expect(Statuses.getAll()[0]).to.have.property('id');
        expect(Statuses.getAll()[0]).to.have.property('label');
    });

    it('should return a list of status IDs matching the global status list', function(){
        expect(typeof Statuses.getIds()[0]).to.equal('string');
    });

    it('should return a list of status labels matching the global status list', function(){
        expect(typeof Statuses.getLabels()[0]).to.equal('string');
    });
});