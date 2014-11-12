"use strict";

springbok.factory('ticketFilters', function(ticketService) {

    var filters = [
        {label: "Nobody's working on those", loadFunction: ticketService.getIdle},
        {label: 'Working on it', loadFunction: ticketService.getInProgress},
        {label: 'Blocked by something', loadFunction: ticketService.getOnHold},
        {label: 'Everything active', loadFunction: ticketService.getAllActive}
    ];

    return {
        getAll: function() {
            return filters;
        }
    };
});

