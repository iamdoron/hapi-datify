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

    it('should datify an incoming payload', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'POST', path: '/documents', handler: function(request){
    		request.payload.should.eql({this: {is: {date: new Date('2011-09-13T17:09:30.909Z'), other: "dds"}}});
    		request.reply("ok");
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
    }),

    it('should datify an incoming query', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'GET', path: '/documents', handler: function(request){
    		request.query.should.eql({from: new Date('2011-09-13T17:09:30.909Z'), other: "dds"});
    		request.reply("ok");
        } });

        server.pack.require('../', function (err) {
        	server.inject({
        		method: "GET",
        		url: "/documents?from=2011-09-13T17:09:30.909Z&other=dds",
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    }),

    it('should not datify an incoming query that its route is filtered by the datified routes regex', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'GET', path: '/documents', handler: function(request){
    		request.query.should.eql({from: '2011-09-13T17:09:30.909Z', other: "dds"});
    		request.reply("ok");
        } });

        server.pack.require('../', {routesToDatifyRegEx: "^nothing$"}, function (err) {
        	server.inject({
        		method: "GET",
        		url: "/documents?from=2011-09-13T17:09:30.909Z&other=dds",
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    }),

    it('should not datify an incoming payload that its route is filtered by the datified routes regex', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'POST', path: '/documents', handler: function(request){
    		request.payload.should.eql({this: {is: {date: '2011-09-13T17:09:30.909Z', other: "dds"}}});
    		request.reply("ok");
        } });

        server.pack.require('../', {routesToDatifyRegEx: "^nothing$"}, function (err) {
        	server.inject({
        		method: "POST",
        		url: "/documents",
        		payload: '{"this": {"is": {"date": "2011-09-13T17:09:30.909Z", "other": "dds"}}}'
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    }),

    it('should datify an incoming query for a specific route regex', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'GET', path: '/nothing', handler: function(request){
    		request.query.should.eql({from: new Date('2011-09-13T17:09:30.909Z'), other: "dds"});
    		request.reply("ok");
        } });

        server.pack.require('../', {routesToDatifyRegEx: "^/nothing$"}, function (err) {
        	server.inject({
        		method: "GET",
        		url: "/nothing?from=2011-09-13T17:09:30.909Z&other=dds",
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    }),

    it('should datify an incoming payload for a specific route regex', function (done) {

        var server = new Hapi.Server();
        server.route({ method: 'POST', path: '/nothing', handler: function(request){
    		request.payload.should.eql({this: {is: {date: new Date('2011-09-13T17:09:30.909Z'), other: "dds"}}});
    		request.reply("ok");
        } });

        server.pack.require('../', {routesToDatifyRegEx: "^/nothing$"}, function (err) {
        	server.inject({
        		method: "POST",
        		url: "/nothing",
        		payload: '{"this": {"is": {"date": "2011-09-13T17:09:30.909Z", "other": "dds"}}}'
        	}, function(res){
        		res.result.should.eql("ok");
        		done();
        	});
        });
    });
});
