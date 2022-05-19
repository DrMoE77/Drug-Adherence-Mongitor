var mongoose = require('mongoose');
var Schema = mongoose.Schema;

drugSchema = new Schema( {
	patient_name: String,
	drug_name: String,
	dosage: Number,
	frequency: Number,
	adherence: String,
	reason: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
drug = mongoose.model('drug', drugSchema);

module.exports = drug;