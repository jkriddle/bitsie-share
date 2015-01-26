/**
 * Schedule this file to run every 2-3 seconds as a cron job. This checks the pending payment balances and updates
 * them as being paid if applicable.
 */

 // Disabling expiration of files after customer feedback that managing a large number of files would be
 // terribly inconvient.

/*
var config = require('../lib/config');
var Helpers = require('../lib/helpers');
var Bitcoind = require('../lib/bitcoind');
var models = require('../lib/models');
var Promise = require('bluebird');


models.Upload.findAll({ where :  ["status='published' AND ((lastPurchased IS NULL AND createdAt < DATE_SUB(NOW(), INTERVAL 30 DAY))"
									+ " OR (lastPurchased IS NOT NULL " 
									+ " AND lastPurchased < DATE_SUB(NOW(), INTERVAL 30 DAY)))"] }).complete(function(err, results) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Found " + results.length + " results.");

	for(var i = 0; i < results.length; i++) {
		var upload = results[i];
		upload.status = "expired";
		upload.save();	
	}
});
*/