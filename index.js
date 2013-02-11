var pflock = require('pflock');
module.exports = adapter;

function adapter (element, model) {
    'use strict';
    var api = pflock(element, model.toJSON());
    
    return api;
}
