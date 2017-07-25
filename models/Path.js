var mongoose = require('mongoose');

var PathSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Path', PathSchema);