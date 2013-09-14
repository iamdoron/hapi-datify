var Hoek = require('hoek');
var Defaults = require('./defaults');
var Datify = require('datify');

// Declare internals

var internals = {};


exports.register = function (pack, options, next) {
    var settings = Hoek.applyToDefaults(Defaults, options);

    var routesToDatifyRegEx = new RegExp(settings.routesToDatifyRegEx);
    pack.ext('onPreHandler', function(request, next){
    	if (routesToDatifyRegEx.test(request.url.pathname)) {
    		request.payload = Datify(request.payload);
    		request.query = Datify(request.query);
    	}
    	
    	next();
    });
    next();
};