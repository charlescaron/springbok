"use strict";

springbok.factory("environmentService", function($resource) {

    var SINGLE_ENV_RESOURCE = $resource("/api/environments/:id", null,
    {
        'update': { method:'PUT' }
    });
    var ALL_ENVS_RESOURCE = $resource("/api/environments/all");

    return {

        save: function(toSave) {
            return SINGLE_ENV_RESOURCE.save(toSave).$promise;
        },

        update: function(toUpdate) {
            return SINGLE_ENV_RESOURCE.update({ id:toUpdate._id }, toUpdate).$promise;
        },

        getAll: function(callback) {
            return ALL_ENVS_RESOURCE.query(callback);
        }
    };
});