'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var environmentRepo = require('../../../api/environments/environment-repo');
var Environment = require('../../../api/environments/environment-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the environment API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Environment, 'find');
        sinon.spy(Environment, 'findById');
        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Environment.find = function(query, callback) {
            callback(undefined, {});
        };
    };

    it('should get all the existing environments', function(){

        environmentRepo.getAll({}, fakeResponse);
        expect(Environment.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get an environment by ID', function(){

        environmentRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Environment.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should create a new environment', function(){

        environmentRepo.create({body: {name: 'Test', description: 'Test'}}, fakeResponse);
        //expect(fakeResponse.json).to.have.been.called;
    });

    it('should update an existing environment', function(){

        environmentRepo.update({body: {name: 'Test', description: 'Test', _id: 1234}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Environment.find.restore();
        Environment.findById.restore();
    });

});