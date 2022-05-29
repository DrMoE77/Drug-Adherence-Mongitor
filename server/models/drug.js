const { Schema, model } = require('mongoose');
const moment = require('moment');

const drugSchema = new Schema(
  {
	name: {
      type: String,
      required: 'You need to enter your name!',
      minlength: 1,
      maxlength: 280
    },
    
    drug_name: {
		type: String,
		required: 'Drug name required!',
		minlength: 1,
		maxlength: 280
	  },
	dosage: {
		type: Number,
		required: 'Please enter the dosage!',
	  },
	frequency: {
		type: Number,
		required: 'Please enter the frequency!',
	  },
	createdAt: {
		type: Date,
		default: Date.now,
		get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
	  },
  
  
  }
);

const Drug = model('Drug', drugSchema);

module.exports = Drug;
