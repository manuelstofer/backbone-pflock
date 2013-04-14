var pflock      = require('pflock'),
    jsonpointer = require('json-pointer');

module.exports = BackbonePflockAdapter;

/**
 * Backbone Models Adapter for Pflock
 *
 * @param element
 * @param model
 * @return {Object}
 */
function BackbonePflockAdapter (element, model) {
    'use strict';

    var binding = pflock(element, model.toJSON());

    binding.on('path-changed', function (path, value) {
        var refTokens = jsonpointer.parse(path),
            attribute = refTokens.shift();

        if (refTokens.length == 0) {
            model.set(attribute, value);

        } else if (refTokens.length > 1) {
            var obj = model.get(attribute);
            jsonpointer.set(obj, jsonpointer.compile(refTokens), value);
            model.set(attribute, obj);
        }
    });

    model.on('change', function () {
        binding.toDocument(model.toJSON());
    });

    return binding;
}
