var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  path: {type: mongoose.Schema.Types.ObjectId, ref: 'Path'},
  athlete: {type:  mongoose.Schema.Types.ObjectId, ref: 'User'}
});

WorkoutSchema.statics.findByUserId = function(userid, population, cb) {
  return this.find({"athlete": userid}, cb).populate(population).exec();
};

module.exports = mongoose.model('Workout', WorkoutSchema);