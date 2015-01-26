var config = require('../lib/config');
var Helpers = require('../lib/helpers');
var Bitcoind = require('../lib/bitcoind');
var models = require('../lib/models');
var Promise = require('bluebird');

function getPayments() {
	return new Promise(function(resolve, reject) {
		models.Session.findAll({ where :  ["payoutSent IS NULL AND btcPaid IS NOT NULL"] , include: [ models.Upload ] }).complete(function(err, results) {
			var payments = {};
			var count = 0;
			var totalConfirmed = 0;
			var totalUnconfirmed = 0;
			var sessionsPaid = [];
			console.log("Found " + results.length + " results.");
			results.forEach(function(session) {
				console.log(session);
				getBalance(session.paymentAddress).then(function(amountPaid) {
					console.log("Balance for " + session.paymentAddress + " is: " + amountPaid);
					if (session.btcPaid == amountPaid) {
						totalConfirmed++;
						var amountToPay = Helpers.satoshiToBtc(session.btcPaid - session.btcFee)
						console.log("Adding to payment queue: " + amountToPay);
						if (payments[session.upload.payoutAddress] == null) payments[session.upload.payoutAddress] = 0;
						payments[session.upload.payoutAddress] += amountToPay;
						sessionsPaid.push(session);
					} else {
						totalUnconfirmed++;
					}
					count++;

					if (count == results.length) {
						models.Log.create({
							type : 'info',
							category : 'system',
							message : totalConfirmed + ' confirmed payments to send. ' + totalUnconfirmed + ' unconfirmed found.'
						});

						if (totalConfirmed == 0) payments = null;
						resolve({
							payments : payments,
							results : sessionsPaid
						});
					}
				});
			});
		});
	});
}

function getBalance(paymentAddress) {
	return new Promise(function(resolve, reject) {
		// check that transaction has more than one confirmation
		Bitcoind.getReceivedByAddressAsync(paymentAddress, 1).spread(function(balance) {
			var satoshiPaid = Helpers.btcToSatoshi(balance);
			resolve(satoshiPaid);
		});
	});
}

models.Log.create({
	type : 'info',
	category : 'system',
	message : 'Checking for unpaid payouts.'
});

getPayments().then(function(data) {
	
	var payments = data.payments;
	var results = data.results;

	if (payments == null) {
		console.log("No payments to send.");
		models.Log.create({
			type : 'info',
			category : 'system',
			message : 'No payments to send.'
		});
		return;
	}


	models.Log.create({
		type : 'info',
		category : 'system',
		message : 'Sending payments.',
		details : JSON.stringify(payments)
	});

	console.log("Sending payments.");
	console.log(payments);
	
	Bitcoind.sendManyAsync(config.bitcoind.account, payments).then(function(res) {
		var txId = res[0];

		models.Log.create({
			type : 'info',
			category : 'system',
			message : 'Payments sent successfully.',
			details : JSON.stringify(payments)
		});

		console.log("Transaction ID: " + txId);
		console.log("Complete!");

		results.forEach(function(session) {
			session.payoutSent = new Date();
			session.payoutTx = txId;
			session.save();
		});
	}).catch(function(e){
	    console.error(e);

		models.Log.create({
			type : 'error',
			category : 'system',
			message : 'Error sending payments.',
			details : 'Error: ' + JSON.stringify(e)
		});
	});
});