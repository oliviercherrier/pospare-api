var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var workout = require('../models/Workout.js');

// /users GET
// /users/:userId GET

/* GET users listing. */
router.get('/users/:userid/workouts', function(req, res, next) {
  User.find(function (err, todos) {
    if (err) return next(err);
    res.json(workout);
  });
});

module.exports = router;