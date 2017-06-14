var express = require('express');
var workoutRouter = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var workout = require('../models/Workout.js');
var User = require('../models/User.js');


// /users GET
// /users/:userId GET

/* GET users listing. */
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