var ds = require("mysql-datastore");

var File = module.exports = function(data) {
	this.id = data.id;
	this.filename = data.filename;
	this.title = data.filename;
	this.price = data.price;
	this.payout_address = data.payout_address;
	this.status = data.status;
	this.admin_key = data.admin_key;
	this.description = data.description;
	this.author_name = data.author_name;
	this.author_email = data.author_email;
	this.upload_date = data.upload_date;
}

File.prototype.save = function() {

}