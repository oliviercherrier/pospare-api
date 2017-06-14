var mongoose = require('mongoose');
var WorkoutSchema = new mongoose.Schema({
  name: String,
});
module.exports = mongoose.model('Workout', WorkoutSchema);