'use strict';

describe('Ticket filters', function() {

    var ticketFilters;

    beforeEach(function() {
        module('springbok');
        inject(function ($injector) {
           ticketFilters = $injector.get('ticketFilters');
       });
    });

    it('should return all the available filters', function(){
        var filters = ticketFilters.getAll();
        expect(filters.length).to.be.greaterThan(0);
    });

    it('should return filters with a label and load function', function(){
        var filters = ticketFilters.getAll();

        filters.forEach(function(filter) {
            expect(filter.label).to.be.defined;
            expect(filter.loadFunction).to.be.defined;
        });
    });

});