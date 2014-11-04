"use strict";

springbok.factory("eventService", function($resource, $http) {

    var SINGLE_EVENT = $resource("/api/events/:id");

    return {

        save: function(toSave) {
            return SINGLE_EVENT.save(toSave).$promise;
        },

        getByTicket: function(id, callback) {
            $http.get('/api/events/ticket/' + id).success(callback);
        }
    };
});
