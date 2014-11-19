'use strict';

var expect = require("chai").expect;
var Problem = require('../../../api/problems/problem-resource');

describe('the structure of the Problem model', function(){

    it('should have the required basic information', function(){

        expect(Problem.modelName).to.equal('Problem');
        expect(Problem.schema.paths).to.have.property('name');
        expect(Problem.schema.paths).to.have.property('description');
    });

});

