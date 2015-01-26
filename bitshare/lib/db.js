var config = require('./config').database; 
var Sequelize = require('sequelize');
var db = module.exports = new Sequelize(config.name, config.user, config.pass, config.options);