/**
 * This file contains pretty much all business and DAL logic for the site.
 * Yes it is not very well architected but it works well and is good enough
 * for a first launch. #dealwithit
 */
var config = require('../lib/config');
var http = require('http');
var https = require('https');
var shortId = require('shortid');
var Promise = require('bluebird');
var nodemailer = require("nodemailer");
var fs = require("fs");
var Bitcoind = require('./bitcoind');
var logger = require('../lib/logger');
var models = require('../lib/models');
var BigNumber = require('bignumber.js');

var API_KEY = '123467891234y78912364789123467891234';

/**
 * Basic POCO object for uploaded file data
 */
var UploadedFile = function(adminKey, file, title, description, author, email, status, amount, address) {
	this.admin_key = adminKey;
	this.size = file.size;
	this.filename = file.name;
	this.title = title;
	this.description = description;
	this.author = author;
	this.email = email;
	this.uploaded = new Date();
	this.status = status;
	this.downloads = 0;
	this.views = 0;
	this.amount = parseFloat(amount) || null;
	this.address = address;
	this.receipt_sent = false;
	this.last_purchased = new Date();
}

var Helpers = module.exports = {

	/**
	 * Send an API call to blockchain.info
	 * @param 	path		{String}	API query path
	 * @param 	callback 	{Function}	Method to run after query finishes executing
	 * @param	method 		{String} 	GET or POST
	 */
	httpsCall : function(host, port, path, callback, method) {
		// NOTE: POST method not implemented yet.
		method = method || 'GET';

		if (method == "POST") throw new Error("POST method not implemented yet.");

		// Blockchain.info request to generate intermediary address
		var options = {
			hostname: host,
			port: port,
			path: path,
			method: method,
			headers : { 
				'Content-Type': 'application/json'
			}
		};

		// If the uploader requires payment for download
		var br = https.request(options, function(r) {
			r.setEncoding('utf8');
			var buffer = "";
			r.on('data', function (chunk) {
				buffer += chunk;
			});

			r.on('end', function() {
				if (callback) callback(JSON.parse(buffer));
			});
		}).end();
	},

	httpCall : function(host, port, path, callback, method) {
		// NOTE: POST method not implemented yet.
		method = method || 'GET';

		if (method == "POST") throw new Error("POST method not implemented yet.");

		// Blockchain.info request to generate intermediary address
		var options = {
			hostname: host,
			port: port,
			path: path,
			method: method,
			headers : { 
				'Content-Type': 'application/json'
			}
		};

		// If the uploader requires payment for download
		var br = http.request(options, function(r) {
			r.setEncoding('utf8');
			var buffer = "";
			r.on('data', function (chunk) {
				buffer += chunk;
			});

			r.on('end', function() {
				if (callback) callback(JSON.parse(buffer));
			});
		}).end();
	},

	authenticate: function(req, res) {
		if (!req.bsess.admin) {
			res.status(404);
			res.render("error", {
				message : "You do not have permissions to view this page."
			});
			return false;
		}
		return true;
	},

	logout: function(req, res) {
		req.bsess.reset();
	},

	usdToInt : function(decimal) {
		return decimal * 100;
	},

	intToUsd : function(decimal) {
		return (decimal / 100);
	},

	btcToSatoshi : function(btc) {
		var bn = new BigNumber(btc);
		return bn.times(100000000).toNumber();
	},

	satoshiToBtc : function(satoshi) {
		var bn = new BigNumber(satoshi);
		return bn.dividedBy(100000000).toNumber();
	},

	btcToBits : function(btc) {
		var bn = new BigNumber(btc);
		return bn.times(1000000).toNumber();
	},

	bitsToBtc : function(btc) {
		var bn = new BigNumber(btc);
		return bn.dividedBy(1000000).toNumber();
	},
	
	satoshiToBits : function(satoshi) {
		var bn = new BigNumber(satoshi);
		return bn.times(100).toNumber();
	},

	bitsToSatoshi : function(bits) {
		var bn = new BigNumber(bits);
		return bn.dividedBy(100).toNumber();
	},

	/**
	 * Retrieve the current market price in USD of 1 BTC
	 * @returns 			{float}		Current price
	 */
	getPrice : function() {
		return new Promise(function(resolve, reject) {
			Helpers.httpsCall("api.bitcoinaverage.com", 443, "/all", function(data) {
			    if (!data) reject("Unable to retrieve market prices.");
				else {
					resolve(data["USD"]["averages"]["24h_avg"]);
				}
			});
		});
	},

	setPaid : function(req, res, uploadId, amountPaid, paymentAddress) {
		models.Upload.find(uploadId).complete(function(err, upload) {
			models.Session.find({ where : { uploadId : uploadId, paymentAddress : paymentAddress } }).complete(function(err, session) {

		    	var viewKey = shortId.generate() + shortId.generate() + shortId.generate();

		    	if (!session) {
		    		console.log("Session not found with payment address of " + address);
		    		return;
		    	}
				
				session.btcPaid = amountPaid;
				session.btcFee = amountPaid * config.app.fee;
				session.viewKey = viewKey;
				session.receiptSent = new Date();

				// renew upload
				upload.lastPurchased = new Date();

				upload.save().complete(function(err) {
					session.save().complete(function(err) {
						// If this record is not new, and we now have record of a confirmation,
						// record it and tell blockchain.info to stop sending us update requests.
						if (session.email) {
							Helpers.sendMail(res, session.email, "Your Bitsie Share download is ready", 
								"emails/client_receipt.handlebars", {
									url : 'http://' + config.app.domain + (config.app.port == "80" ? "" : ":" + config.app.port) 
											+ '/' + upload.slug + "?view=" + viewKey,
								}, 
								function(err) {
									if (err) res.end(err);
									else res.end(JSON.stringify({
										success : true
									}));
								}
							);
						} else {
							res.end(JSON.stringify({
								success : true
							}));
						}
					});
				});
			});
		});
	},

	markPaid : function(req, res, id, btcPaid, transaction, address, confirmations) {
		logger.info("Client payment request received.", {
			id : id,
			btcPaid : btcPaid,
			transaction : transaction,
			address : address,
			confirmations : confirmations
		});

		models.Upload.find(id).complete(function(err, upload) {
			models.Session.find({ where : { paymentAddress : address } }).complete(function(err, session) {

		    	var viewKey = shortId.generate() + shortId.generate() + shortId.generate();

		    	if (!session) {
		    		console.log("Session not found with payment address of " + address);
		    		return;
		    	}
				
				// record user purchase
				var newRecord = false;
				if (session.btcPaid) {
					// we already knew this user had paid, so just update the confirmations
					session.confirmations = confirmations;
				} else {
					// otherwise record all of the information being passed down
					newRecord = true;
					session.btcPaid = btcPaid;
					session.btcFee = btcPaid * config.app.fee;
					session.viewKey = viewKey;
					session.transactionId = transaction;
					session.confirmations = confirmations;
					session.receiptSent = new Date();
					
					// renew upload
					upload.lastPurchased = new Date();

					logger.info("Client payment request accepted.", {
						uploadId : upload.id,
						sessionId : session.id,
						address : address,
						transaction : transaction,
						confirmations : confirmations
					});
				}

				upload.save().complete(function(err) {
					session.save().complete(function(err) {
						// If this record is not new, and we now have record of a confirmation,
						// record it and tell blockchain.info to stop sending us update requests.
						if (newRecord && session.email) {
							Helpers.sendMail(res, session.email, "Your Bitsie Share download is ready", 
								"emails/client_receipt.handlebars", {
									url : 'http://' + config.app.domain + (config.app.port == "80" ? "" : ":" + config.app.port) 
											+ '/' + id + "?view=" + viewKey,
								}, 
								function(err) {
									if (err) res.end(err);
									else res.end(JSON.stringify({
										success : true
									}));
								}
							);
						} else {
							res.end(JSON.stringify({
								success : true
							}));
						}
					});
				});
			});
		});
	},

	/**
	 * Retrieve the current user's session information
	 * @param		req 	{Object} 	Rquest object
	 * @returns				{Object}	User's information
	 */
	getSessionKey : function(req) {
		var sessObj = null;
		if (!req.bsess.key) {
			req.bsess.key = shortId.generate() + shortId.generate();
		}
		return req.bsess.key;
	},

	getProxyAddress : function(id, userSessionId, callbackAction, params) {
		return new Promise(function(resolve, reject) {
			Bitcoind.getNewAddressAsync().then(function(address) {
				resolve(address);
			});
		});
	},

	/**
	 * Send an email
	 */
	 sendMail : function(res, to, subject, template, data, callback) {

	 	data.layout = "email";

		res.render(template, data, function(err, html) {
			if (err) {
				callback(err);
				return;
			}

			var transport = nodemailer.createTransport("SMTP", {
				host : config.email.host,
				secureConnection: config.email.secureConnection, // use SSL?
    			port: config.email.port,
				auth: {
					user: config.email.user,
					pass: config.email.pass
				}
			});

			var mailOptions = {
				from: config.email.fromAddress,
				to: to,
				subject: subject,
				generateTextFromHTML: true,
				html: html
			}

			transport.sendMail(mailOptions, function(err, responseStatus) {
				if (err) {
					callback(err);
					return;
				}
				callback(err, responseStatus);
			});
		});
	 	
	 }
}