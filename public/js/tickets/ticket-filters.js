"use strict";

springbok.factory('ticketFilters', function(ticketService) {

    var filters = [
        {label: 'Opened in the last 24 hours', loadFunction: ticketService.getAllActive},
        {label: 'Unassigned', loadFunction: ticketService.getAllActive},
        {label: 'Assigned for more than two days', loadFunction: ticketService.getAllActive},
        {label: 'All active tickets', loadFunction: ticketService.getAllActive}
    ];

    return {
        getAll: function() {
            return filters;
        }
    };
});

