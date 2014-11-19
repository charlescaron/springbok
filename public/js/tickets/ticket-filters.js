"use strict";

springbok.factory('ticketFilters', function(ticketService) {

    var filters = [
        {id:'open', label: "Nobody's working on those", loadFunction: ticketService.getIdle},
        {id:'inProgress', label: 'Working on it', loadFunction: ticketService.getInProgress},
        {id:'blocked', label: 'Blocked by something', loadFunction: ticketService.getOnHold},
        {id:'active', label: 'Everything active', loadFunction: ticketService.getAllActive}
    ];

    return {
        getAll: function() {
            return filters;
        }
    };
});

