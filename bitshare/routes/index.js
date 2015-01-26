var formidable = require('formidable');
var fs = require('node-fs-extra');
var path = require('path');
var mime = require('mime');
var Promise = require('bluebird');
var Helpers = require('../lib/helpers');
var config = require('../lib/config');
var logger = require('../lib/logger');
var models = require('../lib/models');
var bigInt = require("big-integer");
var moment = require('moment');

var showError = function(req, res, message, err) {
	res.render("error", {
		success: false,
		message: message,
		error : err
	});
}

exports.index = function(req, res) {
	res.render("index", { 
		title: "Bitsie Share"
	});
};

exports.start = function(req, res) {
	res.render("start", { 
		title: "Get Started",
		minPrice : parseFloat(config.app.minPrice).toFixed(2)
	});
};

exports.terms = function(req, res) {
	res.render("terms", { title: "Terms & Conditions" });
}

exports.faq = function(req, res) {
	res.render("faq", { title: "Frequently Asked Questions" });
}

exports.confirmation = function(req, res) {
	var id = req.param("id");
	var adminKey = req.param("key");

	models.Upload.find({ where : { slug : id, status : "published" }}).complete(function(err, upload){ 

		if (err) {
			return showError(req, res, err.message, err);
		}
		if (!upload) {
			return showError(req, res, "Upload not found.");
		}

		if (upload.adminKey != adminKey) {
			return showError(req, res, "Invalid payment token.");
		}

		if (upload.status != "published") {
			return showError(req, res, "File has not been published.");
		}

		res.render("confirmation", {
			id : upload.id,
			upload : upload,
			price : Helpers.intToUsd(upload.price),
			host: 'http://' + config.app.domain + (config.app.port == "80" ? "" : ':' + config.app.port)
		});

	});
}

exports.delete = function(req, res) {
	var slug = req.param("id");

	models.Upload.find({ where : { slug : slug } }).complete(function(err, upload) {

    	if (!upload || upload.status != "published") {
    		showError(req, res, "File not found.");
    		return;
    	}

    	upload.status = "deleted";
    	upload.save();

		if (fs.existsSync("./public/files/" + slug)) {
		   fs.unlink("./public/files/" + slug);
		}

		res.writeHead(302, {
			'Location': '/deleted'
		});
		res.end();

	});
}

exports.deleted = function(req, res) {
	res.render("deleted", { title: "File Deleted" });
}

exports.complete = function(req, res) {
	var id = req.param("id");

	if (!fs.existsSync("./public/files/" + id)) {
	    // Not paid or file not found
	    res.render("pending");
	} else {
		res.writeHead(302, {
			'Location': '/' + id
		});
		res.end();
	}
}

exports.view = function(req, res) {
	var slug = req.param("id");
	var viewKey = req.param("view");
	var adminKey = req.param("key");

	var sessionKey = Helpers.getSessionKey(req);
	var model = {};

	models.Upload.find({ where : { slug : slug } }).complete(function(err, upload) {

    	// Check this upload status
    	if (!upload || upload.status != "published") {
    		showError(req, res, "File not found.");
    		return;
    	}

    	models.Session.find({ 
	    		where : { 
		    		uploadId : upload.id, 
		    		key : sessionKey, 
		    		updatedAt : { 
		    			gt : moment().subtract('hour', 1).toDate()
		    		} 
	    		} 
    		}).complete(function(err, session) {

			// Setup our model with the aquired data

			var paid = false;

			// little dev hack to force it to show as paid
			if (process.env.NODE_ENV != "production") {
				if (req.param("paid") == "true") paid = true;
			}

			// allow admins to view without paying
			if (adminKey && upload.adminKey == adminKey) paid = true;

			// allow users that have cliked on receipt link to view without paying
			if (viewKey && session.viewKey == viewKey) paid = true;

			var keyQuery = "";

			if (adminKey) keyQuery = "key=" + adminKey;
			if (viewKey) keyQuery = "view=" + viewKey;

			function renderPage(sess) {
				var files = fs.readdirSync("./public/files/" + upload.slug);
				res.render("view", { 
					found: true,
					title: "Bitsie Share",
					updatedAt : sess.updatedAt,
					description: "Payment for " + upload.title,
					host: 'http://' + config.app.domain + (config.app.port == "80" ? "" : ':' + config.app.port),
					id: upload.id,
					filename: files[0],
					price : Helpers.intToUsd(upload.price).toFixed(2),
					btcPrice : Helpers.satoshiToBtc(sess.btcPrice.toString()).toFixed(8),
					address : sess.paymentAddress,
					paid : paid,
					upload: upload,
					keyQuery: keyQuery
				});
			}

			if (!paid) {

				// User needs to make a purchase first.
				if (!session) {

					// create new session
					session = {
						key : sessionKey,
						uploadId : upload.id
					};

					// determine the current market price
					Helpers.getPrice().then(function(price) {
						
						// get a new address for user to send payment
						Helpers.getProxyAddress().spread(function(address) {
							session.paymentAddress = address;

							// set a static BTC fee so the user is paying the same amount
							// even if they are refreshing the page a bunch. It needs to remain
							// the same so if they send a .01 BTC payment, the price spikes,
							// and they refresh the page, we can still recognize their payment as valid
							// once it hits the blockchain
							var rawPrice = upload.price / (price * 100);
							session.btcPrice = Helpers.btcToSatoshi(rawPrice.toString());

							models.Session.create(session).complete(function(err) {
								if (err) {
									return showError(req, res, err.message, err);
								}
								renderPage(session);
							});
							logger.info("Proxy address created.", {
								id : upload.id,
								session : session.key, 
								address : address
							});
						}).catch(function(err) {
							showError(req, res, err.message, err);
						});
					}).catch(function(err) {
						showError(req, res, err.message, err);
					});
					
				} else {
					// User has already viewed this page (re-use proxy address)
					renderPage(session)
				}

			} else {
				// User has already paid
				renderPage(session);
			};

		});

	});
	
};

exports.download = function(req, res) {
	var id = req.param("id");
	var viewKey = req.param("view");
	var adminKey = req.param("key");

	models.Upload.find({ where : { slug : id } }).complete(function(err, upload) {

		models.Session.find({ where : { key : Helpers.getSessionKey(req) } }).complete(function(err, session) {

	    	// Not published
	    	if (upload.status != "published") {
	    		res.writeHead(302, {
					'Location': '/'
				});
				res.end();
	    		return;
	    	}

			var paid = false;

			// little dev hack to force it to show as paid
			if (process.env.NODE_ENV != "production") {
				if (req.param("paid") == "true") paid = true;
			}

			// allow admins to view without paying
			if (adminKey && upload.adminKey == adminKey) paid = true;

			// allow users that have cliked on receipt link to view without paying
			if (viewKey && session.viewKey == viewKey) paid = true;

			if (!paid) {
				res.status(401).send('Not authorized.');
				return;
			}
				
			upload.lastPurchased = new Date();
			upload.save().complete(function(err) {
				var files = fs.readdirSync("./public/files/" + id);
				var file = "./public/files/" + upload.slug + "/" + upload.filename;

				var filename = path.basename(file);
				var mimetype = mime.lookup(file);

				res.setHeader('Content-disposition', 'attachment; filename=' + filename);
				res.setHeader('Content-type', mimetype);

				var filestream = fs.createReadStream(file);
				filestream.pipe(res);
			})
	    });
	});
}
