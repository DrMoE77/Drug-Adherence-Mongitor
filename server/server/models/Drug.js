const { Schema, model } = require('mongoose');
const moment = require('moment');

const drugSchema = new Schema(
  {
    drugText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    dosage: {
      type: String,
      required: true,
      
    },
    freq: {
      type: String,
      required: true,
     
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY')
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
    
);

const Drug = model('Drug', drugSchema);

module.exports = Drug;
