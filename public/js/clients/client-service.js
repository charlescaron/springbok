"use strict";

springbok.factory("clientService", function($resource) {

    var SINGLE_CLIENT_RESOURCE = $resource("/api/clients/:id", null,
        {
            'update': { method:'PUT' }
        });
    var ALL_CLIENTS_RESOURCE = $resource("/api/clients/all");

    return {

        save: function(toSave) {
            return SINGLE_CLIENT_RESOURCE.save(toSave).$promise;
        },

        update: function(toUpdate) {
            return SINGLE_CLIENT_RESOURCE.update({ id:toUpdate._id }, toUpdate).$promise;
        },

        getAll: function(callback) {
            return ALL_CLIENTS_RESOURCE.query(callback);
        }
    };
});