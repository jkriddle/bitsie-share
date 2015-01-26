// Set root as current directory
process.chdir(__dirname);

/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var manage = require('./routes/manage');
var http = require('http');
var path = require('path');
var hbs = require('express3-handlebars');
var sessions = require("client-sessions");
var app = express();
var logger = require('./lib/logger');
var balances = require('./lib/balances');

global.port = 3000;
global.domain = 'http://localhost:3000';
global.dirname = __dirname;

// Accept self-signed certs
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// command line parameters
process.argv.forEach(function (val, index, array) {
	var split = val.split("=");
	if (val.indexOf("--host=") != -1) {
		global.domain = split[1];
	}

	if (val.indexOf("--port=") != -1) {
		global.port = split[1];
	}

	if (val.indexOf("--dir=") != -1) {
		global.dirname = split[1];
	}
});

console.log("Directory set to " + global.dirname);

// all environments
app.set('port', process.env.PORT || global.port);
app.set('views', path.join(global.dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(sessions({
  cookieName: 'bsess', // cookie name dictates the key name added to the request object
  secret: 'j4xHFakmSK1vCptv', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));
app.use(express.favicon('public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser({ 
	keepExtensions: true, 
	uploadDir: global.dirname + '/tmp',
	limit: '1024mb'
}));
app.use(express.static(path.join(global.dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Page routing
app.get('/', routes.index);
app.get('/start', routes.start);
app.get('/terms', routes.terms);
app.get('/faq', routes.faq);
app.get('/deleted', routes.deleted);
app.get('/:id', routes.view);
app.get('/download/:id', routes.download);
app.get('/complete/:id', routes.complete);
app.get('/confirmation/:id', routes.confirmation);
app.get('/delete/:id', routes.delete);

// API (JSON)
app.get('/api/price', api.get_price);
app.get('/api/mark_paid/', api.mark_paid);
app.post('/api/set_email', api.set_email);
app.post('/api/upload', api.upload);
app.get('/api/verify_payment/:id', api.verify_payment);
app.get('/api/check_balance/:id', api.check_balance);

app.post('/api/login', api.login);
app.get('/api/upload/get', api.upload_get);
app.get('/api/session/get', api.session_get);
app.get('/api/session/get/:id', api.session_single);
app.get('/api/log/get', api.log_get);

// Manage
app.get('/manage/login', manage.login);
app.get('/manage/logout', manage.logout);
app.get('/manage/upload', manage.upload);
app.get('/manage/session', manage.session);
app.get('/manage/session/:id', manage.session_details);
app.get('/manage/log', manage.log);

// DEVELOPMENT ONLY!!!
if (process.env.NODE_ENV != "production") {
	app.get('/api/test_client_payment/:id', api.test_client_payment);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// CHECK BALANCES
balances.init();
