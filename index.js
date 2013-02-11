var pflock = require('pflock');
module.exports = adapter;

/**
 * Backbone Models Adapter for Pflock
 * @param element
 * @param model
 * @return {Object}
 */
function adapter (element, model) {
    'use strict';

    var binding = pflock(element, model.toJSON());

    binding.on('changed', function (path, value) {
        var attribute = path.replace(/^\./,'');
        if (attribute.match(/\./)) {
            throw new Error('Nested attributes are not supported by the backbone-pflock adapter');
        }
        model.set(attribute, value);
    });

    return binding;
}
