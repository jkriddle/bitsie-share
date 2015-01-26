var Sequelize = require('sequelize');
var db = require('./lib/db');
var models = require('./lib/models');
models.Log.drop();
models.Session.drop();
models.Upload.drop();

db.sync({ force: true })
.complete(function(err) {
	if (!!err) {
		console.log('An error occurred while create the table:', err)
	} else {
		console.log('Tables synced.');

		models.Log.create({ type: 'info', category: 'system', message: "Database tables were created." }).success(function(task) {
			console.log("Complete.");
		})

	}
})
