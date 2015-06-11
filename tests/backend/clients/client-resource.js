'use strict';

var expect = require("chai").expect;
var Client = require('../../../api/clients/client-resource');

describe('the structure of the Client model', function(){

    it('should have the required basic information', function(){

        expect(Client.modelName).to.equal('Client');
        expect(Client.schema.paths).to.have.property('name');
        expect(Client.schema.paths).to.have.property('description');
    });

});

