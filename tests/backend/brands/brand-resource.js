'use strict';

var expect = require("chai").expect;
var Brand = require('../../../api/brands/brand-resource');

describe('the structure of the Brand model', function(){

    it('should have the required basic information', function(){

        expect(Brand.modelName).to.equal('Brand');
        expect(Brand.schema.paths).to.have.property('name');
        expect(Brand.schema.paths).to.have.property('description');
    });

});

