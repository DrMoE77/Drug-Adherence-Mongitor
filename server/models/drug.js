var mongoose = require('mongoose');
var Schema = mongoose.Schema;

drugSchema = new Schema( {
	name: String,
	drug_name: String,
	dosage: Number,
	image: String,
	frequency: Number,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
drug = mongoose.model('drug', drugSchema);

module.exports = drug;