var Promise = require('bluebird');
var config = require('./config');
var Bitcoin = require('bitcoin');

Promise.promisifyAll(Bitcoin.Client.prototype);

var Bitcoind = module.exports = new Bitcoin.Client({
	host: config.bitcoind.host,
	port: config.bitcoind.port,
	user: config.bitcoind.user,
	pass: config.bitcoind.pass,
	timeout: 5000
});