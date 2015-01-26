/**
 * Schedule this file to run every 2-3 seconds as a cron job. This checks the pending payment balances and updates
 * them as being paid if applicable.
 */
var config = require('../lib/config');
var Helpers = require('../lib/helpers');
var Bitcoind = require('../lib/bitcoind');
var models = require('../lib/models');
var Promise = require('bluebird');

var startTime = null;
var endTime = null;
var totalResults = 0;
var totalComplete = 0;

function restart() {
	endTime = new Date();

	var diff = (endTime.getTime() - startTime.getTime());

	var wait = 2000 - diff;

	// wait at least two seconds to start over
	if (wait <= 0) {
		Balances.init();
	} else {
		setTimeout(function() {
			Balances.init();
		}, wait);
	}
}

function checkBalance(session) {
	var url = "/api/check_balance/" + session.uploadId + "?address=" + session.paymentAddress;
	console.log("Calling http://" + config.app.domain + ":" + config.app.port + url);
	Helpers.httpCall(config.app.domain, config.app.port, url, function(resp) {
		console.log(resp);
		totalComplete++;

		if (totalComplete == totalResults) {
			restart();
		}
	});
}

function run() {
	console.log("Running balance checker.");
	startTime = new Date();
	totalResults = 0;
	totalComplete = 0;
	models.Session.findAll({ where :  ["btcPaid IS NULL AND updatedAt > DATE_SUB(NOW(), INTERVAL 1 HOUR)"] }).complete(function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("Found " + results.length + " results.");
		totalResults = results.length;
		for(var i = 0; i < results.length; i++) {
			var session = results[i];
			checkBalance(session);		
		}
		if (results.length == 0) restart();
	});
}

var Balances = module.exports = {

	init : function() {
		run();
	}

}


