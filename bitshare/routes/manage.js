var Promise = require('bluebird');
var Helpers = require('../lib/helpers');
var config = require('../lib/config');
var models = require('../lib/models');
var formidable = require('formidable');

var showError = function(req, res, message, err) {
	res.render("error", {
		success: false,
		message: message,
		error : err
	});
}

exports.login = function(req, res) {
	res.render("manage/login", { 
		title: "Login"
	});
};

exports.logout = function(req, res) {
	Helpers.logout(req, res);
	 res.redirect('/manage/login');
};

exports.upload = function(req, res) {
	if (!Helpers.authenticate(req, res)) return;

	res.render("manage/upload", { 
		title: "Uploads",
		layout :"admin"
	});
};

exports.session = function(req, res) {
	if (!Helpers.authenticate(req, res)) return;

	res.render("manage/session", { 
		title: "Sessions",
		layout :"admin"
	});
};

exports.session_details = function(req, res) {
	if (!Helpers.authenticate(req, res)) return;

	var id = req.param("id");

	res.render("manage/session_details", { 
		title: "Session Details",
		id : id,
		layout :"admin"
	});
};

exports.log = function(req, res) {
	if (!Helpers.authenticate(req, res)) return;

	res.render("manage/log", { 
		title: "Logs",
		layout :"admin"
	});
};