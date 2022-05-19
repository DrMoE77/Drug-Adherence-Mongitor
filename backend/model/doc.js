var mongoose = require('mongoose');
var Schema = mongoose.Schema;

docSchema = new Schema( {
	username: String,
	password: String,
	mobile_nr: Number,
	type: String
}),
doc = mongoose.model('doc', docSchema);

module.exports = doc;