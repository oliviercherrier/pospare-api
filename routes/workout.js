var express = require('express');
var workoutRouter = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var workout = require('../models/Workout.js');
var User = require('../models/User.js');


// /users GET
// /users/:userId GET

/* PUT workout for user req.header.useremail */
workoutRouter.put('/', function(req, res, next) {
  User.findByPospareId(req.params.userId, ["workouts"], function(err, user) {
    if (err) res.send(err);
    if(!user){
      res.sendStatus(204);
    }
    else{
      // Add workout for this user
      var newWorkout = new workout();
      newWorkout.save();
      user.workouts.push(newWorkout);
      console.log(user);
      user.save();
      res.json({ message: 'Workout updated!' });
    }
  });
});

/* GET workouts listing for the user req.header.useremail */
workoutRouter.get('/', function(req, res, next) {
  User.findByPospareId(req.params.userId, ["workouts"], function(err, user) {
    if (err) res.send(err);
    if(!user){
      res.sendStatus(204);
    }
    else{
      res.json(user.workouts);
    }
  });
});

module.exports = workoutRouter;