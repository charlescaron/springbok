'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var brandRepo = require('../../../api/brands/brand-repo');
var Brand = require('../../../api/brands/brand-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the brand API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Brand, 'find');
        sinon.spy(Brand, 'findById');

        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Brand.find = function(query, callback) {
            callback(undefined, {});
        };

        Brand.findByIdAndUpdate = function(id, query, callback) {
            callback(undefined, {});
        };

    };

    it('should get all brands', function(){
        brandRepo.getAll({}, fakeResponse);
        expect(Brand.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get a brand by ID', function(){
        brandRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Brand.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

  /*  it('should create a new brand', function(){
        brandRepo.create({body: {name: "name test", description: "description test"}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });
*/
    it('should update an existing brand', function(){
        brandRepo.update({body: {name: "name test", description: "description test"}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Brand.find.restore();
        Brand.findById.restore();
    });

});
