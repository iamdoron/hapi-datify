var Lab = require('lab');
var Hapi = require('hapi');
var Domain = require('domain');
var Chai = require('chai');

Chai.should();

// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;

describe('hapi-datify', function () {

    it('can be added as a plugin to hapi', function (done) {

        var server = new Hapi.Server();
        server.pack.require('../', function (err) {

            expect(err).to.not.exist;
            done();
        });
    }),

    it('datifies an incoming payload', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'POST', path: '/documents', handler: function(request){
    		request.payload.should.eql({this: {is: {date: new Date('2011-09-13T17:09:30.909Z'), other: "dds"}}});
    		request.reply("ok");
    		done();
        } });

        server.pack.require('../', function (err) {
        	server.inject({
        		method: "POST",
        		url: "/documents",
        		payload: '{"this": {"is": {"date": "2011-09-13T17:09:30.909Z", "other": "dds"}}}'
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    });
});
