"use strict";

springbok.factory("brandService", function($resource) {

    var SINGLE_BRAND_RESOURCE = $resource("/api/brands/:id", null,
        {
            'update': { method:'PUT' }
        });
    var ALL_BRANDS_RESOURCE = $resource("/api/brands/all");

    return {

        save: function(toSave) {
            return SINGLE_BRAND_RESOURCE.save(toSave).$promise;
        },

        update: function(toUpdate) {
            return SINGLE_BRAND_RESOURCE.update({ id:toUpdate._id }, toUpdate).$promise;
        },

        getAll: function(callback) {
            return ALL_BRANDS_RESOURCE.query(callback);
        }
    };
});