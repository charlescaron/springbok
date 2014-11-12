'use strict';

function Status(_id, _label) {
    this.id = _id;
    this.label = _label;
}

var statuses = [
    new Status('open', 'Open'),
    new Status('in_progress', 'Working on it'),
    new Status('blocked_third_party', 'Blocked by a third party'),
    new Status('bugfix', 'Requires bugfix'),
    new Status('closed', 'Closed')
];

module.exports = {

    getAll: function() {return statuses;},
    getIds: function() {
        return statuses.map(function(element) {
            return element.id;
        });
    },
    getLabels: function() {
        return statuses.map(function(element) {
            return element.label;
        });
    }
};
