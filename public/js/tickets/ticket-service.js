"use strict";

springbok.factory('ticketService', function($resource) {

    var SINGLE_TICKET_RESOURCE = $resource("/api/tickets/:id", null,
    {
        'update': { method:'PUT' }
    });
    var ACTIVE_TICKETS_RESOURCE = $resource("/api/tickets/active");
    var STATUS_RESOURCE = $resource("/api/tickets/statuses");

    return {
        save: function(toSave) {
            return SINGLE_TICKET_RESOURCE.save(toSave).$promise;
        },

        update: function(toUpdate) {
            SINGLE_TICKET_RESOURCE.update({id: toUpdate._id}, toUpdate);
        },

        getSingle: function(id, callback) {
            SINGLE_TICKET_RESOURCE.get(id, callback);
        },

        getAllActive: function(callback) {
            ACTIVE_TICKETS_RESOURCE.query(callback);
        },

        getStatuses: function(callback) {
            STATUS_RESOURCE.query(callback);
        }
    };

});
