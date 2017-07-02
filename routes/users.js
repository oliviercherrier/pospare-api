var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var workoutRouter = require("./workout.js");

// /users GET
// /users/:userId GET
userRouter.get('/:userid',  function(req, res) {

  User.findByPospareId(req.params.userid, ["roles","workouts"], function(err, user) {
    if (err) res.send(err);
    if(!user){
      res.sendStatus(204);
    }
    else{
      res.json(user);
    }
  });
});

/* GET users listing. */
userRouter.get('/', 
  isAuthorized,
  function(req, res, next) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    }).populate('roles').populate('workouts').exec();
  }
);

userRouter.use('/:userId/workouts', workoutRouter);

function isAuthorized(req, res, next){
  User.findByEMail(req.headers.useremail, ["roles"], function(err, user){
    if (err) res.send(err);
    
    if(!user || !user.isAdmin()){
      res.status(401).json({status: 'error', msg: 'Your are not allowed to see list of users'});
    } 
    else {
      next();
    }
  });
}

module.exports = userRouter;
