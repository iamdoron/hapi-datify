var Hoek = require('hoek');
var Defaults = require('./defaults');
var Datify = require('datify');

// Declare internals

var internals = {};


exports.register = function (pack, options, next) {

    var settings = Hoek.applyToDefaults(Defaults, options);
    pack.ext('onPreHandler', function(request, next){
    	request.payload = Datify(request.payload);
    	next();
    });
    next();
};