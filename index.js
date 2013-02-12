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
        if (path.match(/\./)) {
            throw new Error('Nested attributes are not supported by the backbone-pflock adapter');
        }
        model.set(path, value);
    });

    model.on('change', function () {
        binding.toDocument(model.toJSON());
    });

    return binding;
}
