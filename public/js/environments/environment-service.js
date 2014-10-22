"use strict";

springbok.factory("environmentService", function($resource) {

    var SINGLE_ENV_RESOURCE = $resource("/api/environments/:id");
    var ALL_ENVS_RESOURCE = $resource("/api/environments/all");

    return {

        save: function(toSave) {
            SINGLE_ENV_RESOURCE.save(toSave);
        },

        getAll: function(callback) {
            return ALL_ENVS_RESOURCE.query(callback);
        }
    };
});