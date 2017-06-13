var mongoose = require('mongoose');
var WorkoutSchema = new mongoose.Schema({
  _id: String,
  name: String,
});
module.exports = mongoose.model('Workout', WorkoutSchema);