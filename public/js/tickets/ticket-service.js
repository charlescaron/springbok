"use strict";

springbok.factory('ticketService', function($resource, $http) {

    var SINGLE_TICKET_RESOURCE = $resource("/api/tickets/:id", null,
    {
        'update': { method:'PUT' }
    });
    var ACTIVE_TICKETS_RESOURCE = $resource("/api/tickets/active");
    var CLOSED_TICKETS_RESOURCE = $resource("/api/tickets/closed");
    var IDLE_TICKETS_RESOURCE = $resource("/api/tickets/idle");
    var ON_HOLD_TICKETS_RESOURCE = $resource("/api/tickets/onhold");
    var IN_PROGRESS_TICKETS_RESOURCE = $resource("/api/tickets/inprogress");
    var STATUS_RESOURCE = $resource("/api/tickets/statuses");
    var PRIORITY_RESOURCE = $resource("/api/tickets/priorities");

    return {
        save: function(toSave) {
            return SINGLE_TICKET_RESOURCE.save(toSave).$promise;
        },

        saveEvent: function(id, toSave) {
            return $http.post('/api/tickets/' + id + '/event', toSave);
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

        getAllClosed: function(callback) {
            CLOSED_TICKETS_RESOURCE.query(callback);
        },

        getOnHold: function(callback) {
            ON_HOLD_TICKETS_RESOURCE.query(callback);
        },

        getInProgress: function(callback) {
            IN_PROGRESS_TICKETS_RESOURCE.query(callback);
        },

        getIdle: function(callback) {
            IDLE_TICKETS_RESOURCE.query(callback);
        },

        getStatuses: function(callback) {
            STATUS_RESOURCE.query(callback);
        },

        getPriorities: function(callback) {
            PRIORITY_RESOURCE.query(callback);
        }
    };

});
