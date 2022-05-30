const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reason');

const drugSchema = new Schema(
  {
    drug_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    freq: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

drugSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Drug = model('Drug', drugSchema);

module.exports = Drug;
