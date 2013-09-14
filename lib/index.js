var Hoek = require('hoek');
var Defaults = require('./defaults');

// Declare internals

var internals = {};


exports.register = function (pack, options, next) {

    var settings = Hoek.applyToDefaults(Defaults, options);

    next();
};