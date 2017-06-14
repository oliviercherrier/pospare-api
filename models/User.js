var mongoose = require('mongoose');

var Role = require('../models/Role.js');

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
});

UserSchema.statics.findByPospareId = function(name, cb) {
  return this.findOne({ id: new RegExp(name, 'i') }, cb).populate('roles').exec();
};

UserSchema.methods.isAdmin = function(){
  console.log(this.roles.length);
  for (var i = 0; i < this.roles.length; i++){
    if(this.roles[i].name == "Administrator"){
      return true;
    }
  }
  return false;
}

UserSchema.statics.findByEMail = function(useremail,cb){
  return this.findOne({email: new RegExp(useremail,'i')}, cb).populate('roles').exec();
}

module.exports = mongoose.model('User', UserSchema);
