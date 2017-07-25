var express = require('express');
var workoutRouter = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var Workout = require('../models/Workout.js');
var User = require('../models/User.js');
var Path = require('../models/Path.js');


// /users/:userId/workouts PUT
/* PUT workout for user req.params.userId */
workoutRouter.put('/', function(req, res, next) {
  User.findByPospareId(req.params.userId, ["workouts"], function(err, user) {
    if (err) res.send(err);
    if(!user){
      res.sendStatus(204);
    }
    else{

      /************ Add workout to this user ***************/
      var newWorkout = new Workout();

      newWorkout.athlete = user;
      newWorkout.active = true;

      // Set name if name exist
      if (req.body.name){
        newWorkout.name = req.body.name;
      }

      // Create path document if it is an outdoor workout
      if(req.query.outdoor == "true"){
        newWorkout.path = new Path();
        newWorkout.path.save()
      }
      // Save Workout
      newWorkout.save();

      // Add workout to this user
      user.workouts.push(newWorkout);
      user.save();

      // Send response to client
      res.json({ message: 'Workout created!' });
    }
  });
});

/* GET workouts listing for the user req.params.userId */
workoutRouter.get('/', function(req, res, next) {
  User.findByPospareId(req.params.userId, [], function(err,user){
    Workout.findByUserId(user._id,["athlete"], function(err, workouts) {
      if (err) res.send(err);
      res.json(workouts);
    });
  });
});

module.exports = workoutRouter;