"use strict";

springbok.factory('ticketService', function($resource) {

    var SINGLE_TICKET_RESOURCE = $resource("/api/tickets/:id");
    var ACTIVE_TICKETS_RESOURCE = $resource("/api/tickets/active");

    return {
        save: function(toSave) {
            SINGLE_TICKET_RESOURCE.save(toSave);
        },

        getSingle: function(id, callback) {
            SINGLE_TICKET_RESOURCE.get(id, callback);
        },

        getAllActive: function(callback) {
            ACTIVE_TICKETS_RESOURCE.query(callback);
        }
    };

});
