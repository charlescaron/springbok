'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var problemRepo = require('../../../api/problems/problem-repo');
var Problem = require('../../../api/problems/problem-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the problem API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Problem, 'find');
        sinon.spy(Problem, 'findById');

        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Problem.find = function(query, callback) {
            callback(undefined, {});
        };

        Problem.findByIdAndUpdate = function(id, query, callback) {
            callback(undefined, {});
        };

    };

    it('should get all problems', function(){
        problemRepo.getAll({}, fakeResponse);
        expect(Problem.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get a problem by ID', function(){
        problemRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Problem.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

  /*  it('should create a new problem', function(){
        problemRepo.create({body: {name: "name test", description: "description test"}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });
*/
    it('should update an existing problem', function(){
        problemRepo.update({body: {name: "name test", description: "description test"}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Problem.find.restore();
        Problem.findById.restore();
    });

});
