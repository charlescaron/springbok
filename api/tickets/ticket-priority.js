'use strict';

function Priority(_id, _shortLabel, _longLabel, _severity) {
    this.id = _id;
    this.shortLabel = _shortLabel;
    this.longLabel = _longLabel;
    this.severity = _severity;
}

var priorities = [
    new Priority('top', 'Top', 'Stop whatever you are doing and get to it! TOP PRIORITY.', 'danger'),
    new Priority('medium', 'Medium', "It's okay, keep breathing. Within the week is fine. MEDIUM PRIORITY.", 'warning'),
    new Priority('low', 'Low', 'Seriously ? How can this be a problem ? LOW PRIORITY.', 'info'),
    new Priority('none', 'None', 'Not quite sure yet... NO PRIORITY.')
];

module.exports = {

    getAll: function() {return priorities;},
    getIds: function() {
        return priorities.map(function(element) {
            return element.id;
        });
    },
    getLabels: function() {
        return priorities.map(function(element) {
            return element.shortLabel;
        });
    }
};

