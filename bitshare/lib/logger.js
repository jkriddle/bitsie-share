var winston = require('winston');
var config = require('./config');
var util = require('util');
var nodemailer = require('nodemailer');

var EmailLogger = winston.transports.EmailLogger = function (options) {
	this.name = 'emailLogger';
	this.level = options.level || 'info';
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(EmailLogger, winston.Transport);

EmailLogger.prototype.log = function (level, msg, meta, callback) {

	// Only log errors or exceptions
	if (level != "error") return;

	var transport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: config.email.user,
			pass: config.email.pass
		}
	});

	var mailOptions = {
		from: config.email.fromAddress,
		to: config.app.errorEmail,
		subject: "BITSIE ERROR LOG " + new Date(),
		generateTextFromHTML: true,
		html: "Level: " + level + "<br />" + "MSG: " + msg + "<br />" + JSON.stringify(meta)
	}

	transport.sendMail(mailOptions, function(err, responseStatus) {
		if (err) {
			callback(err, false);
			return;
		}
		callback(null, true);
	});
};

var win = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({ colorize: true, json: false, timestamp: true }),
		new winston.transports.File({ filename: __dirname + '/../logs/debug.log', json: false }),
		new EmailLogger({})
	],
	/*exceptionHandlers: [
		new (winston.transports.Console)({ json: false, timestamp: true }),
		new winston.transports.File({ filename: __dirname + '/../logs/exceptions.log', json: false }),
		new EmailLogger({})
	],*/
	exitOnError: false
});

var Logger = module.exports = win;