const { Schema } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionText: {
      type: String,
      required: false,
      maxlength: 280
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = reactionSchema;
