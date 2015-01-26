var Sequelize = require('sequelize');
var db = require('./db');
var Promise = require('bluebird');

/**
 * File upload
 */
var Upload = db.define('upload', {
	filename: { type: Sequelize.STRING, allowNull: false },
	filesize: { type: Sequelize.BIGINT, allowNull: false },
	slug: { type: Sequelize.STRING, unique: true, allowNull: false },
	title: { type: Sequelize.STRING, allowNull: false },
	price: { type: Sequelize.BIGINT, allowNull: false },
	payoutAddress: { type: Sequelize.STRING, allowNull: false },
	status: { type: Sequelize.STRING, allowNull: false },
	adminKey: { type: Sequelize.STRING, allowNull: false },
	description: { type: Sequelize.TEXT },
	authorName: { type: Sequelize.STRING },
	authorEmail: { type: Sequelize.STRING },
	lastPurchased: { type: Sequelize.DATE },
	receiptSent: { type: Sequelize.DATE, allowNull: true },
}, {
	getterMethods: {
        createdAtString: function () {
            var date = this.getDataValue('createdAt');
            return date.toUTCString();
        }
    }
});

/**
 * User session
 */
var Session = db.define('session', {
	uploadId: {
		type:          Sequelize.INTEGER,
		references:    'uploads',
		referencesKey: 'id',
		onDelete:      'cascade'
	},
	key: { type: Sequelize.STRING, allowNull: false },
	paymentAddress: { type: Sequelize.STRING, allowNull: false },
	btcPrice: { type: Sequelize.BIGINT },
	btcPaid: { type: Sequelize.BIGINT },
	btcFee: { type: Sequelize.BIGINT },
	email: Sequelize.STRING,
	viewKey: Sequelize.STRING,
	confirmations: Sequelize.INTEGER,
	receiptSent: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
	payoutSent: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
	payoutTx : Sequelize.STRING
});

/**
 * System logs
 */
var Log = db.define('log', {
	uploadId: {
		type:          Sequelize.INTEGER,
		references:    'uploads',
		referencesKey: 'id',
		onDelete:      'cascade'
	},
	sessionId: {
		type:          Sequelize.INTEGER,
		references:    'sessions',
		referencesKey: 'id',
		onDelete:      'cascade'
	},
	type: { type: Sequelize.STRING, allowNull: false },
	category: Sequelize.STRING,
	message: { type: Sequelize.STRING, allowNull: false },
	details: Sequelize.TEXT
});


// Relationships
Upload.hasMany(Log);
Upload.hasMany(Session);

Session.hasMany(Log);
Session.belongsTo(Upload);

Log.belongsTo(Upload);
Log.belongsTo(Session);

// Export
var models = {
	Upload : Upload,
	Log : Log,
	Session : Session
};
Promise.promisifyAll(models);
module.exports = models;