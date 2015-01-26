var Helpers = require("./lib/helpers");
var Bitcoind = require('./lib/bitcoind');
var BigNumber = require('bignumber.js');
var nodemailer = require('nodemailer');
var config = require('./lib/config');

Bitcoind.listAccountsAsync().spread(function(count) {
	console.log(count);
});

/*var x = new BigNumber(12.432432432);
console.log(x.toNumber());*/
/*
Bitcoind.listAccountsAsync().spread(function(count) {
	console.log(count);
});

.then(function(address) {
	console.log(address);
});*/

/*Helpers.getUserByAddress("1ANbm2TQ7Gg6Smrj2WJ834Ytc4d6LHxnWL").then(function(user) {
	console.log(user);
}).fail(function(err) {
	console.log(err);
});*/