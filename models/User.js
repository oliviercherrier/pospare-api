var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  _id: String,
  id: String,
  firstname: String,
  lastname: String
});

UserSchema.statics.findByPospareId = function(name, cb) {
  console.log("findByPospareId method")
  return this.findOne({ id: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', UserSchema);
