const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || http://127.0.0.1:27017/welcomeU-db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
