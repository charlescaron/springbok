'use strict';

var expect = require("chai").expect;
var Env = require('../../../api/environments/environment-resource');

describe('the structure of the Environment model', function(){

    it('should have the required basic information', function(){

        expect(Env.modelName).to.equal('Environment');
        expect(Env.schema.paths).to.have.property('name');
        expect(Env.schema.paths).to.have.property('description');
    });

});