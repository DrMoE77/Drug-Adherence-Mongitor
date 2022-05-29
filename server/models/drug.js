var mongoose = require('mongoose');
var Schema = mongoose.Schema;

drugSchema = new Schema( {
	name: String,
	drug_name: String,
	dosage: Float,
	image: String,
	frequency: Float,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;