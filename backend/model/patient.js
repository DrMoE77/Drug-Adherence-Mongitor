var mongoose = require('mongoose');
var Schema = mongoose.Schema;

patientSchema = new Schema( {
	patient_name: String,
	drug_name: String,
	dosage: Number,
	frequency: Number,
	//adherence: function() {
	//				return this.clicks / this.views
	//			},
	reason: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
patient = mongoose.model('patient', patientSchema);

module.exports = patient;