var config = {
	app : {
		errorEmail : 'somemail@example.com',
		fee : .04,
		minPrice : 0.5,
		domain : 'localhost',
		port : 3000,
		secret : 'mysecretpass',
		adminUser : "admin",
		adminPass : "test"
	},
	bitcoind: {
		host :  '127.0.0.1',
		port: 8332,
		user: 'mywallet',
		pass: 'abc12345',
		account: '' // Bitcoind "account" label
	},
	database : {
		name : "share",
		user : "root",
		pass : "abc12345",
		options : {
			dialect: "mysql",
			host: "localhost",
			port: 8889,
			logging: console.log // console logging -- disable in production!
		}
	},
	email : {
		fromAddress : 'Bitsie Share <share@bitsie.com>',
		host : 'smtp.sendgrid.net',
		user : 'myaccount',
		pass : 'abc1234',
		port : 465,
		secureConnection : true
	}
}

// Development
if (process.env.NODE_ENV == "development") {
	console.log("Applying development settings.");
}

// Production
if (process.env.NODE_ENV == "production") {
	console.log("Applying production settings.");
}

module.exports = config;