'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var logger = require('../../logger');
chai.use(sinonChai);
var expect = chai.expect;

describe('the Springbok logger', function(){

    beforeEach(function(done) {
        sinon.spy(logger, 'info');
        done();
    });

    it('should log human readable info messages in a file', function(){

        expect(logger.transports.file.level).to.equal('info');
        expect(logger.transports.file.json).to.be.false;
    });

    it('should should display colorized debug level messages at the console', function(){

        expect(logger.transports.console.level).to.equal('debug');
        expect(logger.transports.console.colorize).to.be.true;
    });

    it('should provide a streaming function to higher level loggers', function(){

        logger.stream.write('Test message');
        expect(logger.info).to.have.been.called;
    });

    afterEach(function() {
        logger.info.restore();
    });

});