const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
 patient_name: {
    type: String,
    required: true
  },
  drug_name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },

  adherence: {
    type: Number,

  },
  reason: {
    type: String,
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;