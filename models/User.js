var mongoose = require('mongoose');

var Role = require('./Role.js');

var UserSchema = new mongoose.Schema({
  businessId: String,
  firstname: String,
  lastname: String,
  email: String,
  roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
  workouts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}]
});

UserSchema.statics.findByPospareId = function(userid, population, cb) {
  return this.findOne({ businessId: userid }, cb).populate(population).exec();

};

UserSchema.methods.isAdmin = function(){
  for (var i = 0; i < this.roles.length; i++){
    if(this.roles[i].name == "Administrator"){
      return true;
    }
  }
  return false;
}

UserSchema.statics.findByEMail = function(useremail,populate,cb){
  return this.findOne({email: useremail}, cb).populate(populate).exec();
}

module.exports = mongoose.model('User', UserSchema);
