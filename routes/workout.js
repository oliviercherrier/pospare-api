var express = require('express');
var workoutRouter = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var workout = require('../models/Workout.js');
var User = require('../models/User.js');


// /users GET
// /users/:userId GET

/* GET users listing. */
workoutRouter.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = workoutRouter;