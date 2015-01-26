var formidable = require('formidable');
var fs = require('node-fs-extra');
var shortId = require('shortid');
var Helpers = require('../lib/helpers');
var config = require('../lib/config');
var validator = require('validator');
var SqlString = require('../lib/sqlstring');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var logger = require('../lib/logger');
var models = require('../lib/models');
var moment = require('moment');
var Bitcoind = require('../lib/bitcoind');
var bitcore = require('bitcore');
var Address = bitcore.Address;

/**
 * Render a JSON formatted error message
 */
var showJsonError = function(req, res, message, err) {
	res.end(JSON.stringify({
		success: false,
		message: message,
		error : err
	}));
}

module.exports = {

	login : function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		var success = (username == config.app.adminUser) && (password == config.app.adminPass);

		// Set admin flag
		if (success) {
			req.bsess.admin = true;
		}

		res.end(JSON.stringify({
			success : success
		}));
	},

	upload_get : function(req, res) {

		if (!Helpers.authenticate(req, res)) return;

		var page = req.param("page");
		var limit = req.param("size");
		var offset = page * limit;

		var search = { 
			offset : offset,
			limit : limit
		};

		var where = [];
		if (req.param("id")) where.push("`id` LIKE " + SqlString.escape('%' + req.param("id") + '%'));
		if (req.param("title")) where.push("`title` LIKE " + SqlString.escape('%' + req.param("title") + '%'));
		if (req.param("payout_address")) where.push("`payoutAddress` LIKE " + SqlString.escape('%' + req.param("payout_address") + '%'));
		if (req.param("status")) where.push("`status` LIKE " + SqlString.escape('%' + req.param("status") + '%'));
		if (req.param("created")) where.push("`createdAt` LIKE " + SqlString.escape('%' + req.param("created") + '%'));
		if (where.length > 0) search.where = where;

		models.Upload.findAndCountAll(search).complete(function(err, result) {
			res.end(JSON.stringify({
				"total_rows": result.count,
				"rows" : result.rows.map(function(r) {
					return {
						"id" : r.id,
						"slug" : r.slug,
						"title" : r.title,
						"filesize" : r.filesize,
						"price" : r.price,
						"payoutAddress" : r.payoutAddress,
						"status" : r.status,
						"created" : r.createdAt
					}
				})
			}));
		});
	},

	session_get : function(req, res) {

		if (!Helpers.authenticate(req, res)) return;

		var page = req.param("page");
		var limit = req.param("size");
		var offset = page * limit;

		var search = { 
			offset : offset,
			limit : limit
		};

		var where = [];
		if (req.param("id")) where.push("`id` LIKE " + SqlString.escape('%' + req.param("id") + '%'));
		if (req.param("key")) where.push("`key` LIKE " + SqlString.escape('%' + req.param("key") + '%'));
		if (req.param("payment_address")) where.push("`paymentAddress` LIKE " + SqlString.escape('%' + req.param("payment_address") + '%'));
		if (req.param("payout_sent")) where.push("`payoutSent` LIKE " + SqlString.escape('%' + req.param("payout_sent") + '%'));
		if (where.length > 0) search.where = where;

		models.Session.findAndCountAll(search).complete(function(err, result) {
			if (err) {
				return showJsonError(req, res, err);
			}
			res.end(JSON.stringify({
				"total_rows": result.count,
				"rows" : result.rows.map(function(r) {
					return {
						"id" : r.id,
						"paymentAddress" : r.paymentAddress,
						"btcPrice" : r.btcPrice,
						"btcPaid" : r.btcPaid,
						"uploadId" : r.uploadId,
						"payoutSent" : r.payoutSent ? moment(r.payoutSent).format("YYYY-MM-DD hh:mm:ss") : ""
					}
				})
			}));
		});
	},

	session_single : function(req, res) {
		var id = req.param("id");
		models.Session.find(id).complete(function(err, r) {
			if (err) {
				return showJsonError(req, res, err);
			}
			res.end(JSON.stringify({
				"id" : r.id,
				"paymentAddress" : r.paymentAddress,
				"btcPrice" : r.btcPrice,
				"btcPaid" : r.btcPaid,
				"uploadId" : r.uploadId,
				"payoutSent" : r.payoutSent ? moment(r.payoutSent).format("YYYY-MM-DD hh:mm:ss") : ""
			}))
		})
	},

	log_get : function(req, res) {

		if (!Helpers.authenticate(req, res)) return;

		var page = req.param("page");
		var limit = req.param("size");
		var offset = page * limit;

		var search = { 
			offset : offset,
			limit : limit
		};

		var where = [];
		if (req.param("id")) where.push("`id` LIKE " + SqlString.escape('%' + req.param("id") + '%'));
		if (req.param("type")) where.push("`type` LIKE " + SqlString.escape('%' + req.param("type") + '%'));
		if (req.param("category")) where.push("`category` LIKE " + SqlString.escape('%' + req.param("category") + '%'));
		if (req.param("message")) where.push("`message` LIKE " + SqlString.escape('%' + req.param("message") + '%'));
		if (req.param("created")) where.push("`createdAt` LIKE " + SqlString.escape('%' + req.param("created") + '%'));
		if (where.length > 0) search.where = where;

		models.Log.findAndCountAll(search).complete(function(err, result) {
			if (err) {
				return showJsonError(req, res, err);
			}
			res.end(JSON.stringify({
				"total_rows": result.count,
				"rows" : result.rows.map(function(r) {
					return {
						"id" : r.id,
						"type" : r.type,
						"category" : r.category,
						"message" : r.message,
						"createdAt" : r.createdAt,
					}
				})
			}));
		});
	},

	get_price : function(req, res) {
		console.log("Getting price...");
		logger.info("GETPRICE");
		Helpers.getPrice().then(function(price) {
	   		res.json(price)
		}).catch(function(err) {
			console.log("FAIL", err);
		})
	},

	set_email : function(req, res) {
		var address = req.param("address");

		var sess = models.Session.find({ where : { key : Helpers.getSessionKey(req), paymentAddress : address} }).complete(function(err, session) {

			if (err) {
				return showJsonError(req, res, err.message, err);
			}

			if (!session) {
				return showJsonError(req, res, "Session not found.");
			}

			if (!req.body.email) return showJsonError(req, res, "Invalid email address");

			session.email = req.body.email;

			console.log("SETTING EMAIL TO " + session.email + " FOR SESSION " + session.id);

			session.save().complete(function(err) {
				if (err) {
					return showJsonError(req, res, err.message, err);
				}
				res.end(JSON.stringify({
					success : true
				}));
			});
			
		});
		
	},

	/**
	 * Mark a client payment as PAID
	 */
	mark_paid : function(req, res) {

		var txId = req.param("tx");
		var secret = req.param("secret");

		// Keep the bad guys out.
		if (secret != config.app.secret) {
			return res.status(404).send('Not found.');
		}

		Bitcoind.getRawTransactionAsync(txId, 1).spread(function(tx) {

			function checkTransacton(txId, address, value, confirmations) {
				models.Session.find({ where : { paymentAddress : address } }).complete(function(err, session) {
					if (err) {
						res.end(JSON.stringify({
							success : false,
							message : err
						}));
						
						return console.log(err);
					} else if (!session) {
						res.end(JSON.stringify({
							success : false,
							message : "Could not find session with payment address " + address
						}));

						console.log("Could not find session with payment address " + address);
						return ;
					}

					// invalid payment amount
					if (Helpers.satoshiToBtc(session.btcPrice) > value) {
						console.log("File was paid for but with a lesser amount!" + session.paymentAddress 
									+ " (required " + Helpers.satoshiToBtc(session.btcPrice) + " but paid " + value + ")");
						res.end(JSON.stringify({
							success : false,
							message : "File was paid for but with a lesser amount!"
						}));
						return;
					}

					// success
					console.log("Marking " + session.paymentAddress + " as paid with value " + value);

					Helpers.markPaid(req, res, session.uploadId, value, txId, address, confirmations);
					
					res.end(JSON.stringify({
						success : true
					}));

				})
			}

			for(var i = 0; i < tx.vout.length; i++) {

				var value = tx.vout[i].value;

				for(var j = 0; j < tx.vout[i].scriptPubKey.addresses.length; j++) {
					// check our database for this address, and mark it as complete
					var txAddress = tx.vout[i].scriptPubKey.addresses[j];
					console.log("Looking up " + txAddress + ' with value of ' + value);
					checkTransacton(txId, txAddress, value, tx.confirmations);
				}
			}
		});
	},

	test_client_payment : function(req, res) {
		var id = req.param("id");

		models.Upload.find({ where : { slug : id } }).complete(function(err, upload) {
			models.Session.find({ where : { key : Helpers.getSessionKey(req), uploadId : upload.id } }).complete(function(err, session) {

				function getUrl(s) {
					Helpers.markPaid(req, res, upload.id, session.btcPrice, "b3d0a34193016698c892077142959c542c77c6b080c792e19412b03f3008af9a", 
													s.paymentAddress, 8);
					res.end("*ok*");
				}

				if (!session) {
					// create new session
					session = {
						key : Helpers.getSessionKey(req),
						uploadId : upload.id
					};

					// get a new address for user to send payment
					Helpers.getProxyAddress().spread(function(address) {
						session.paymentAddress = address;
						models.Session.create(session).complete(function(err, newSess) {
							if (err) {
								return showError(req, res, err.message, err);
							}
							getUrl(session);
						});
						logger.info("Proxy address created.", {
							id : upload.id,
							session : session.key, 
							address : address
						});
					}).catch(function(err) {
						showError(req, res, err.message, err);
					});
				} else {
					getUrl(session);
				}
			});
		});
	},

	check_balance : function(req, res) {
		var uploadId = req.param("id");
		var paymentAddress = req.param("address");
		models.Session.find({ where : { uploadId : uploadId, paymentAddress : paymentAddress }}).complete(function(err, session) {
			Bitcoind.getReceivedByAddressAsync(session.paymentAddress, 0).spread(function(balance) {
				var satoshiPaid = Helpers.btcToSatoshi(balance);
				console.log(session.btcPrice + " price vs " + satoshiPaid + " paid.");
				var paid = session.btcPrice <= satoshiPaid;
				if (paid && session.btcPaid == null) {
					// update session
					Helpers.setPaid(req, res, uploadId, satoshiPaid, session.paymentAddress);
				}
				res.end(JSON.stringify({
					paid : paid,
					balance : satoshiPaid
				}));
			});
		});
	},

	upload : function(req, res) {
	    var form = new formidable.IncomingForm();

	    var slug = shortId.generate();
	    var adminKey = shortId.generate() + shortId.generate() + shortId.generate();

		form.parse(req, function(err, fields, files) {
			if (!files.myFile) {
				res.end();
				return;
			}

			res.writeHead(200, {'content-type': 'application/json'});

			// Validation
			var resp = {
				success : false,
				message: ""
			};

			if (fields.description.length > 1000) {
				resp.message = "Description must be 1000 characters or less.";
			}

			if (fields.email && !validator.isEmail(fields.email)) {
				resp.message = "Invalid email address.";
			}

			if (!validator.isFloat(fields.price)) {
				resp.message = "Invalid price.";
			} else if (parseFloat(fields.price) < config.app.minPrice) {
				resp.message = "Minimum price for a file is " + config.app.minPrice + ".";
			}

			if (!fields.address) {
				resp.message = "Payment address is required.";
			} else {
				var addr = new Address(fields.address);
				if (!addr.isValid()) resp.message = "Invalid payment address.";
			}

			if (resp.message.length > 0) {
				res.end(JSON.stringify(resp));
				return;
			}

			// Save upload
			models.Upload.create({
				filename : files.myFile.name,
				slug : slug,
				filesize : files.myFile.size,
				title : fields.title,
				price : Helpers.usdToInt(fields.price),
				payoutAddress : fields.address,
				status : "published",
				adminKey : adminKey,
				description : fields.description,
				authorName : fields.author,
				authorEmail : fields.email
			}).complete(function(err, upload) {

				if (err) {
					//showError(req, res, "Unable to save file.", err);
					resp.message = "Unable to save file: " + err;
					res.end(JSON.stringify(resp));
					return;
				}

				if (upload.authorEmail) {
					Helpers.sendMail(res, upload.authorEmail, "Your Bitsie Share Receipt", 
						"emails/receipt.handlebars", {
							upload : upload,
							price : parseFloat(fields.price).toFixed(2),
							url : 'http://' + config.app.domain + (config.app.port == "80" ? "" : ":" + config.app.port) + '/' + slug
						}, 
						function(err, res) {
							//.catch silently for now
							if (!err) {
								upload.receiptSent = new Date();
								upload.save();
							}
						}
					);
				}

				resp.upload = {
					"slug" : slug,
					"filename" : upload.filename,
					"complete" : true,
					"key" : upload.adminKey
				};

				resp.success = true;
				res.end(JSON.stringify(resp));
			});
	    });
	 
	    form.on('progress', function(bytesReceived, bytesExpected) {
	        var percent_complete = (bytesReceived / bytesExpected) * 100;
	        console.log(percent_complete.toFixed(2));
	    });
	 
	    form.on('error', function(err) {
	        console.error(err);
	    });
	 
	    form.on('end', function(fields) {

	        /* Temporary location of our uploaded file */
	        var tempPath = this.openedFiles[0].path;

		 	var dir = "./public/files/";

		   	var fileName = this.openedFiles[0].name;

	    	fs.mkdirs(dir + slug, function() {

		        // Location where we want to copy the uploaded file
		        var newLocation = dir + slug + "/";
		        var newFileName = newLocation + fileName;

		        fs.copy(tempPath, newFileName, function(err) {  
		            if (err) {
		                console.error(err);
		            } else {
		                console.log("success!")
		            }
		        });

	    	});
	    });
	},

	verify_payment : function(req, res) {
		var id = req.param("id");

		models.Upload.find(id).complete(function(err, upload) {
			models.Session.find({ where : { key : Helpers.getSessionKey(req), uploadId : upload.id } }).complete(function(err, session) {
				
				var paid = session && session.btcPaid > 0;
				res.end(JSON.stringify({
					paid : paid,
					view : (session ? session.viewKey : null)
				}));
			});
		});
	}

}