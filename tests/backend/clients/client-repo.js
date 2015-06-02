'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var clientRepo = require('../../../api/clients/client-repo');
var Client = require('../../../api/clients/client-resource');

chai.use(sinonChai);
var expect = chai.expect;

var fakeResponse;

describe('the client API', function(){

    beforeEach(function(done) {
        createMocks();
        sinon.spy(Client, 'find');
        sinon.spy(Client, 'findById');

        done();
    });

    var createMocks = function() {
        fakeResponse = {
            status: function() {return this},
            json: sinon.spy()
        };

        Client.find = function(query, callback) {
            callback(undefined, {});
        };

        Client.findByIdAndUpdate = function(id, query, callback) {
            callback(undefined, {});
        };

    };

    it('should get all clients', function(){
        clientRepo.getAll({}, fakeResponse);
        expect(Client.find).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should get a client by ID', function(){
        clientRepo.getById({params: {id: 1234}}, fakeResponse);
        expect(Client.findById).to.have.been.called;
        expect(fakeResponse.json).to.have.been.called;
    });

    it('should update an existing client', function(){
        clientRepo.update({body: {name: "name test", description: "description test"}}, fakeResponse);
        expect(fakeResponse.json).to.have.been.called;
    });

    afterEach(function() {
        Client.find.restore();
        Client.findById.restore();
    });

});
