"use strict";

springbok.factory("problemService", function($resource) {

    var SINGLE_PROBLEM_RESOURCE = $resource("/api/problems/:id", null,
        {
            'update': { method:'PUT' }
        });
    var ALL_PROBLEMS_RESOURCE = $resource("/api/problems/all");

    return {

        save: function(toSave) {
            return SINGLE_PROBLEM_RESOURCE.save(toSave).$promise;
        },

        update: function(toUpdate) {
            return SINGLE_PROBLEM_RESOURCE.update({ id:toUpdate._id }, toUpdate).$promise;
        },

        getAll: function(callback) {
            return ALL_PROBLEMS_RESOURCE.query(callback);
        }
    };
});