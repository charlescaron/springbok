'use strict';

var expect = require('chai').expect;
var Ticket = require('../../../api/tickets/ticket-resource');

describe('the structure of the Ticket model', function(){

    it('should have the required basic information', function(){

        expect(Ticket.modelName).to.equal('Ticket');
        expect(Ticket.schema.paths).to.have.property('title');
        expect(Ticket.schema.paths).to.have.property('status');
        expect(Ticket.schema.paths).to.have.property('priority');
        expect(Ticket.schema.paths).to.have.property('description');
        expect(Ticket.schema.paths).to.have.property('environment');
        expect(Ticket.schema.paths).to.have.property('problem');
        expect(Ticket.schema.paths).to.have.property('client');
        expect(Ticket.schema.paths).to.have.property('events');
    });

});

