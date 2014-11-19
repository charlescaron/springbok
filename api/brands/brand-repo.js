'use strict';

var Brand = require('./brand-resource');

var currentResponse;
var processResponse = function(err, response) {

    if (err) {
        currentResponse.status(500).json(err);
    } else {
        currentResponse.json(response);
    }
};

module.exports = {
    getAll: function(req, res) {
        currentResponse = res;
        Brand.find({}, processResponse);
    },
    getById: function(req, res) {
        currentResponse = res;
        Brand.findById(req.params.id, processResponse);
    },
    create: function(req, res) {
        currentResponse = res;
        var rawBrand = req.body;
        var converted = new Brand({name: rawBrand.name, description: rawBrand.description});
        converted.save(processResponse);
    },
    update: function(req, res) {
        currentResponse = res;
        var rawBrand = req.body;
        var converted = {name: rawBrand.name, description: rawBrand.description};
        Brand.findByIdAndUpdate(rawBrand._id, converted, processResponse);
    }
};

